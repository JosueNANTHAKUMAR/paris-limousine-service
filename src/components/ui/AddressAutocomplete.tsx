"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { clsx } from "clsx";
import { MapPin, Loader2, CheckCircle, X } from "lucide-react";

interface PhotonFeature {
    properties: {
        osm_id: number;
        name?: string;
        street?: string;
        housenumber?: string;
        postcode?: string;
        city?: string;
        country?: string;
        type?: string;
    };
}

interface AddressAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

function formatFeature(f: PhotonFeature): { title: string; subtitle: string; full: string } {
    const p = f.properties;
    const title = p.name || [p.housenumber, p.street].filter(Boolean).join(" ") || "";
    const street = p.name ? [p.housenumber, p.street].filter(Boolean).join(" ") : "";
    const city = [p.postcode, p.city].filter(Boolean).join(" ");
    const subtitle = [street, city].filter(Boolean).join(", ");
    const full = [title, subtitle].filter(Boolean).join(", ");
    return { title, subtitle, full };
}

export function AddressAutocomplete({ value, onChange, placeholder, className, icon }: AddressAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
        if (value === "") {
            setInputValue("");
            setIsSelected(false);
        }
    }, [value]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedValue || debouncedValue.length < 2 || isSelected) {
                setSuggestions([]);
                return;
            }
            setIsLoading(true);
            try {
                // Photon API — biased to Paris (lat/lon of Paris center)
                const res = await fetch(
                    `https://photon.komoot.io/api/?q=${encodeURIComponent(debouncedValue)}&limit=6&lang=en&lat=48.8566&lon=2.3522&zoom=12`
                );
                if (res.ok) {
                    const data = await res.json();
                    const features: PhotonFeature[] = data.features || [];
                    // Filter to France only
                    const filtered = features.filter(f => f.properties.country === "France");
                    setSuggestions(filtered);
                    if (filtered.length > 0) setIsOpen(true);
                }
            } catch {
                // silent
            } finally {
                setIsLoading(false);
            }
        };
        fetchSuggestions();
    }, [debouncedValue]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (f: PhotonFeature) => {
        const { full } = formatFeature(f);
        setInputValue(full);
        onChange(full);
        setIsSelected(true);
        setIsOpen(false);
        setSuggestions([]);
    };

    const handleClear = () => {
        setInputValue("");
        onChange("");
        setIsSelected(false);
        setSuggestions([]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
        setIsSelected(false);
        setIsOpen(true);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="absolute left-4 top-3 z-10">
                {isSelected
                    ? <CheckCircle className="h-5 w-5 text-green-400" />
                    : icon || <MapPin className="h-5 w-5 text-slate-500" />
                }
            </div>

            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => { if (inputValue.length >= 2 && !isSelected) setIsOpen(true); }}
                placeholder={placeholder || "Hotel name or street address..."}
                className={clsx(
                    "w-full bg-slate-900/50 border rounded-xl py-3 pl-12 pr-10 text-slate-50 focus:ring-2 outline-none transition-all hover:bg-slate-900 text-sm sm:text-base",
                    isSelected
                        ? "border-green-500/50 focus:ring-green-500/30"
                        : "border-slate-800 focus:ring-gold/50 focus:border-gold/50",
                    className
                )}
            />

            <div className="absolute right-3 top-3">
                {isLoading
                    ? <Loader2 className="h-5 w-5 animate-spin text-gold/70" />
                    : inputValue
                        ? <button onClick={handleClear} className="text-slate-500 hover:text-slate-300 transition-colors"><X className="h-5 w-5" /></button>
                        : null
                }
            </div>

            {isSelected && (
                <p className="text-[11px] text-green-400 mt-1 ml-1">✓ Address confirmed</p>
            )}
            {!isSelected && !inputValue && (
                <p className="text-[11px] text-slate-500 mt-1 ml-1">Type at least 2 characters to search</p>
            )}

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                    <p className="text-[10px] text-slate-500 px-4 pt-2 pb-1 uppercase tracking-wider">Select your address</p>
                    {suggestions.map((f, i) => {
                        const { title, subtitle } = formatFeature(f);
                        return (
                            <button
                                key={`${f.properties.osm_id}-${i}`}
                                onMouseDown={(e) => { e.preventDefault(); handleSelect(f); }}
                                className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-t border-slate-800/50 flex items-start gap-3 group"
                            >
                                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm text-slate-200 font-medium truncate group-hover:text-white">{title || subtitle}</p>
                                    {title && subtitle && <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>}
                                </div>
                            </button>
                        );
                    })}
                    <p className="text-[10px] text-slate-600 px-4 py-2 text-center border-t border-slate-800">
                        Can't find it? Type the full address manually
                    </p>
                </div>
            )}

            {isOpen && !isLoading && suggestions.length === 0 && debouncedValue.length >= 2 && (
                <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl px-4 py-3">
                    <p className="text-sm text-slate-400">No results — try a different spelling or type manually</p>
                </div>
            )}
        </div>
    );
}
