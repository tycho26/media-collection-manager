import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { PackageType } from "../../../../generated/prisma/enums";

import * as z from "zod";
import { zfd } from "zod-form-data";
import DBConnection from "../../../utils/DBConnection"

// Reimplement this after I transformed the form to a client component
// import { useState } from "react"

export default async function CreateMedia() {
  const PackageTypesSelectOptions = Object.keys(PackageType) as Array<keyof typeof PackageType>;
  const PackageTypesListItems = PackageTypesSelectOptions.map((pkgType) => (
    <SelectItem key={pkgType} value={pkgType}>
      {pkgType}
    </SelectItem>
  ));

  // const {isProcessing, setProcessing} = useState(false)
  
  async function createMedia(formData: FormData) {
    "use server";
    // setProcessing(true)
    const DBConn = new DBConnection();
    const prisma = DBConn.connector
    const movies = await prisma.movie.findMany();
    console.log("Movies:", movies);
    
    console.log(formData);

    const mediaSchema = zfd.formData({
      title: zfd.text(),
      rating: zfd.numeric(z.number().max(5)),
      studio: z.string(),
      release: zfd.text(z.iso.date()),
      packageType: z.enum(PackageType),
      EAN: zfd.numeric()
    });

    try {
      const validateResult = mediaSchema.parse(formData);
      const movie = await prisma.movie.create({
        data: {
          title: validateResult.title,
          rating: validateResult.rating,
          studio: validateResult.studio,
          release: new Date(validateResult.release),
          packageType: validateResult.packageType,
          EAN: validateResult.EAN
        }
      });
      console.log(movie)

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation Error:", error);
      }
      else{
        console.error(error)
      }
    }
  }

  return (
    <Card className="absolute md:end-200 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create new media item</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createMedia}>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input name="title" id="media-title" />
          </Field>
          <Field>
            <FieldLabel>EAN</FieldLabel>
            <Input name="EAN" id="ean" />
          </Field>
          <Field>
            <FieldLabel>Rating</FieldLabel>
            <Input
              name="rating"
              type="number"
              id="media-rating"
              min="0"
              max="5"
            />
          </Field>
          <Field>
            <FieldLabel>Studio</FieldLabel>
            <Input name="studio" id="media-studio" />
          </Field>
          <Field>
            <FieldLabel>Release</FieldLabel>
            <Input name="release" type="date" id="media-release" />
          </Field>
          <Field>
            <FieldLabel>Package Type</FieldLabel>
            <Select name="packageType">
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Package Type</SelectLabel>
                  {PackageTypesListItems}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field className="mt-3">
            <Button type="submit">Create</Button>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
