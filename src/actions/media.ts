'use server'

import * as React from "react"
import DBConnection from "@/utils/DBConnection"
import { validateMedia } from "./validation";
import z from "zod";

async function create(formData: FormData) {
    
    // setProcessing(true)
    const DBConn = new DBConnection();
    const prisma = DBConn.connector

    

    try {
      const validateResult = await validateMedia(formData);
      // Implement check for validation success or errors
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
        console.log(movie)
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation Error:", error);
      }
      else{
        console.error(error)
      }
    }
  }

export {create as mediaCreate}