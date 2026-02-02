"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
    const searchParams = useSearchParams();

    const vehicle = searchParams.get("vehicle");
    const price = searchParams.get("price");
    const departure = searchParams.get("from");
    const arrival = searchParams.get("to");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const duration = searchParams.get("duration");
    const service = searchParams.get("service");

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-serif text-slate-50 mb-4">Booking Confirmed!</h1>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    Thank you for choosing Paris Limousine Service. A confirmation email has been sent to you.
                </p>

                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-left space-y-4 mb-8">
                    <h3 className="text-gold font-serif text-lg border-b border-slate-800 pb-2 mb-4">Booking Details</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-slate-500">Vehicle Class</span>
                            <span className="text-slate-50 font-medium">{vehicle}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Total Price</span>
                            <span className="text-gold font-medium text-lg">{price}€</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Date</span>
                            <span className="text-slate-50 font-medium">{date}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Time</span>
                            <span className="text-slate-50 font-medium">{time}</span>
                        </div>
                        {service === 'distance' ? (
                            <>
                                <div className="col-span-2">
                                    <span className="block text-slate-500">Pickup</span>
                                    <span className="text-slate-50 font-medium">{departure}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-slate-500">Drop-off</span>
                                    <span className="text-slate-50 font-medium">{arrival}</span>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-2">
                                <span className="block text-slate-500">Duration</span>
                                <span className="text-slate-50 font-medium">{duration} Hours</span>
                            </div>
                        )}
                    </div>
                </div>

                <Link href="/">
                    <Button className="!bg-[#D4AF37] hover:!bg-[#E5C55D] text-slate-950 font-bold px-8 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <Home className="mr-2 h-4 w-4" /> Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-gold">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
