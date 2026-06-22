'use server'

import { PackageType } from "../../generated/prisma/enums";
import * as z from "zod";
import { zfd } from "zod-form-data";

type MovieFormType = {
    title: string,
    rating: number,
    studio: string,
    release: string
    packageType: PackageType
    EAN: number
}

//Refactor name to movieSchema!
const mediaSchema = zfd.formData({
      title: zfd.text(),
      rating: zfd.numeric(z.number().max(5)),
      studio: z.string(),
      release: zfd.text(z.iso.date()),
      packageType: z.enum(PackageType),
      EAN: zfd.numeric()
    });


async function media(data:FormData): Promise<z.ZodSafeParseResult<MovieFormType>>{
    return await mediaSchema.safeParseAsync(data);
}


export {media as validateMedia}
export type {MovieFormType};