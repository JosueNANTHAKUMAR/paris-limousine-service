"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { clsx } from "clsx";
import { MapPin, Loader2 } from "lucide-react";

interface Suggestion {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface AddressAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function AddressAutocomplete({ value, onChange, placeholder, className, icon }: AddressAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const debouncedValue = useDebounce(inputValue, 500);

    // Sync local state with prop only if they differ significantly (avoids loops)
    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedValue || debouncedValue.length < 3) {
                setSuggestions([]);
                return;
            }

            // Avoid searching if the user just selected an item (inputValue matches exact suggestion)
            // But here we don't have the last selected item easily, checking length or simple equality helps.

            setIsLoading(true);
            try {
                // Using OpenStreetMap Nominatim API
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedValue)}&addressdetails=1&limit=5&countrycodes=fr`
                );

                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                    setIsOpen(true);
                }
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Only fetch if the debounce value matches the current input (user stopped typing)
        // and we are not in a "just selected" state (which we approximate by checking if menu is open or not, 
        // though simpler here is just to fetch always when typing).
        // To avoid re-opening menu after selection, we can check a flag or similar. 
        // For simplicity: if input equals previously selected, we might still fetch. 
        // Let's rely on user interaction to open.

        if (debouncedValue && isOpen) {
            // If it's already open, we update. 
            // Actually, we want to open IT when we type.
        }

        fetchSuggestions();

    }, [debouncedValue]);

    // Handle outside click to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (suggestion: Suggestion) => {
        setInputValue(suggestion.display_name);
        onChange(suggestion.display_name);
        setIsOpen(false);
        setSuggestions([]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
        setIsOpen(true);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            {icon && (
                <div className="absolute left-4 top-3 z-10">
                    {icon}
                </div>
            )}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => { if (inputValue.length >= 3) setIsOpen(true); }}
                placeholder={placeholder}
                className={clsx(
                    "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all hover:bg-slate-900 text-sm sm:text-base",
                    icon ? "pl-12" : "px-4",
                    className
                )}
            />

            {isLoading && (
                <div className="absolute right-4 top-3.5">
                    <Loader2 className="h-5 w-5 animate-spin text-gold/70" />
                </div>
            )}

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                    {suggestions.map((item) => (
                        <button
                            key={item.place_id}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border-b border-slate-800/50 last:border-0 flex items-start gap-3"
                        >
                            <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                            <span className="line-clamp-2">{item.display_name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
