import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";


interface Props {

    properties: Property[];

}


export default function PropertyGrid({
    properties,
}: Props) {


    if (!properties.length) {

        return (

            <div className="text-center py-20 text-gray-500">

                No properties found

            </div>

        );

    }


    return (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {properties.map((property)=> (

                <PropertyCard
                    key={property.id}
                    property={property}
                />

            ))}


        </div>

    );

}
