import { supabase } from "@/config/supabase";
import { NextRequest, NextResponse } from "next/server";


export const runtime = 'edge'  // use edge runtime -> more fast 

// create posts
/**
 * Handles POST requests to create a new product.
 * @param request The incoming Next.js request object.
 * @param {FormData<any>} 
 * @returns {Promise<NextResponse> |Promise<Error>} The response with the created product or an error.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const product_image = formData.get("product_image") as File | null | string;

    if (!title || !description || !price) {
        return NextResponse.json({ error: "Some fields are required!" }, { status: 400 });
    }

    let image_url = product_image ?? '';

    if (product_image instanceof File && product_image) {
        // file upload
        const fileExt = product_image.name.split('.').pop()  //filenem.pnj =>["filename","pnj"].pop() =>pnj as string
        const fileName = `${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from('db5_product-images').upload(fileName, product_image);
        if (error instanceof Error) {
            return NextResponse.json({ error }, { status: 400 })
        }
        image_url = supabase.storage.from('db5_product-images').getPublicUrl(fileName).data.publicUrl || ''
    };

    const { data: products, error, status } = await supabase.from('db5_products')
        .insert({ title, description, price, product_image: image_url })
        .select()
        .single()

    if (status !== 201) {
        if (error instanceof Error) return NextResponse.json({ error })
        return NextResponse.json({ err: 'product create failed! || status is not 201' })
    }

    return NextResponse.json({ products }, { status: 201 })
}


// GET PRODUCTS
/**
 * @param request
 * @return {Promise<NextResponse>}
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('limit');

    const { data: products, error } = await supabase.from('db5_products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(Number(limit) || 10)

    if (error instanceof Error) {
        return NextResponse.json({ message: error?.message }, { status: 404 })
    }

    return NextResponse.json({ products, total: products?.length }, {
        status: 200, headers: {
            'Cotent-Type': 'application/json'
        }
    })
}


