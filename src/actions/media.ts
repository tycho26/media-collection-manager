'use server'

import DBConnection from "@/utils/DBConnection"
import { validateMedia } from "./validation";
import * as z from "zod";

async function create(formData: FormData) {
    const DBConn = new DBConnection();
    const prisma = DBConn.connector

    try {
      const validateResult = await validateMedia(formData);
      if(!validateResult.error){
        const movie = await prisma.movie.create({
          data: {
            title: validateResult.data.title,
            rating: validateResult.data.rating,
            studio: validateResult.data.studio,
            release: new Date(validateResult.data.release),
            packageType: validateResult.data.packageType,
            EAN: validateResult.data.EAN
          }
        });
      }
      else{
        console.error("Validation Error:", validateResult.error);
        return z.flattenError(validateResult.error)
      }

    } catch (error) {
        console.error(error)
    }
  }

export {create as mediaCreate}