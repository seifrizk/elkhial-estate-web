import { getProperties } from "@/services/property";
import PropertyCard from "@/components/property/PropertyCard";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";


export default async function Home() {
    const response = await getProperties();

    const properties = response.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Hero */}
            <HeroSection />

            {/* Stats */}
            <StatsSection />

            {/* Latest Properties */}
            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="mb-10">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Latest Properties
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Discover our latest properties available for sale and rent.
                    </p>

                </div>

                {properties.length === 0 ? (

                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

                        <h3 className="text-xl font-semibold text-gray-900">
                            No properties available
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Check back later for new properties.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {properties.map((property: any) => (

                            <PropertyCard
                                key={property.id}
                                property={property}
                            />

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}
