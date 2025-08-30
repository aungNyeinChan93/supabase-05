import { supabase } from "@/config/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";


// GET DETAIL PRODUCT
/**
 * 
 * @param request 
 * @param {Promise<{id:string}>}
 * @returns {Promise<NextResponse>}
 */
export async function GET(request: NextRequest, { params }: { params: Promise<Partial<{ id: string }>> }): Promise<NextResponse> {
    const { id } = await params;
    const { data: product, error, status } = await supabase.from('db5_products').select('*').eq('id', id).single();

    if (status != 200) {
        if (error instanceof PostgrestError) {
            return NextResponse.json({ messgae: error?.message })
        }
        return NextResponse.json({ messgae: error })
    }
    return NextResponse.json({ id, product }, { status: 200 })
}

// Delete PRODUCT
/**
 * 
 * @param request 
 * @param param1 
 * @returns {Promise<NextResponse>}
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await params;
    const { error } = await supabase.from('db5_products').delete().eq('id', id)
    if (error instanceof Error) {
        return NextResponse.json({ error }, { status: 400 })
    };
    return NextResponse.json({ message: "Delete success" })
}


