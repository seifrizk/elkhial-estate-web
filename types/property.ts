export interface PropertyImage {

    id: number;

    url: string;

    path: string;

    alt_text: string | null;

    is_cover: boolean;

    sort_order: number;

}

export interface PropertyVideo {

    id: number;

    url: string;

    path: string;

    thumbnail: string | null;

    duration: number | null;

    video_type: string;

    sort_order: number;

}

export interface Feature {

    id: number;

    name: string;

    slug: string;

    category?: string;

    icon?: string | null;

}

export interface PropertyType {

    id: number;

    name: string;

    slug: string;

}

export interface Area {

    id: number;

    name: string;

}

export interface Owner {

    id: number;

    name: string;

    phone: string;

}

export interface Property {

    id: number;

    property_code: string;

    title: string;

    description: string;

    purpose: string;

    status: string;

    price: string;

    currency: string;

    negotiable: boolean;

    area_size: string;

    bedrooms: number;

    bathrooms: number;

    garages: number;

    year_built: number | null;

    floor: number | null;

    address: string | null;

    location: {

        latitude: string | null;

        longitude: string | null;

    };

    owner?: Owner;

    property_type?: PropertyType;

    area?: Area;

    images?: PropertyImage[];

    videos?: PropertyVideo[];

    features?: Feature[];

    views_count?: number;

    is_favorite?: boolean;

    published_at: string;

    created_at: string;

    updated_at: string;

}

export interface MyPropertiesResponse {

    success: boolean;

    data: Property[];

    meta: {

        current_page: number;

        last_page: number;

        per_page: number;

        total: number;

    };

}

export interface PropertyTypeOption {

    id: number;

    name: string;

}

export interface AreaOption {

    id: number;

    name: string;

}

export interface LookupPropertyType {

    id: number;

    name: string;

    slug: string;

}

export interface LookupArea {

    id: number;

    name: string;

    city: {

        id: number;

        name: string;

    };

}
