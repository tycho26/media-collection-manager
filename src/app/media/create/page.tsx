"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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

import DBConnection from "../../../utils/DBConnection"
import { mediaCreate } from "@/actions/media";

import { useState } from "react"
import { Spinner } from "@/components/ui/spinner";
import { object, ZodError } from "zod";
import { MovieFormType } from "@/actions/validation";

export default function CreateMedia() {
  const PackageTypesSelectOptions = Object.keys(PackageType) as Array<keyof typeof PackageType>;
  const PackageTypesListItems = PackageTypesSelectOptions.map((pkgType) => (
    <SelectItem key={pkgType} value={pkgType}>
      {pkgType}
    </SelectItem>
  ));

  const [isProcessing, setProcessing] = useState(false);
  const [formErrors, setErrors] = useState({});
  
  async function createMedia(formData: FormData) {
    setProcessing(true)
    const errors:object|void = await mediaCreate(formData);
    if(errors instanceof Object){
      //TODO: Maak aparte utils file voor herbruikbare types en interfaces
      //TODO: Maak type voor flattenedErrors Zod object
      //TODO: Maak interface voor generic formErrors object
      //TODO: Maak type (gebaseerd op bovenstaande interface) 
      let formErrorsDOM = {}
      Object.keys(errors.fieldErrors).forEach((field)=>{
        formErrorsDOM[field] = errors.fieldErrors[field].map((error) => <FieldError>{error}</FieldError>)
      })
      setErrors(formErrorsDOM)
    }
    setProcessing(false)
  }

  return (
    <Card className="absolute md:end-200 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create new media item</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createMedia}>
          <Field data-invalid={!!formErrors.title}>
            <FieldLabel>Title</FieldLabel>
            <Input name="title" id="media-title" />
            {formErrors.title}
          </Field>
          <Field data-invalid={!!formErrors.EAN}>
            <FieldLabel>EAN</FieldLabel>
            <Input name="EAN" id="ean" />
            {formErrors.EAN}
          </Field>
          <Field data-invalid={!!formErrors.Rating}>
            <FieldLabel>Rating</FieldLabel>
            <Input
              name="rating"
              type="number"
              id="media-rating"
              min="0"
              max="5"
            />
            {formErrors.Rating}
          </Field>
          <Field data-invalid={!!formErrors.Studio}>
            <FieldLabel>Studio</FieldLabel>
            <Input name="studio" id="media-studio" />
            {formErrors.Studio}
          </Field>
          <Field data-invalid={!!formErrors.Release}>
            <FieldLabel>Release</FieldLabel>
            <Input name="release" type="date" id="media-release" />
            {formErrors.Release}
          </Field>
          <Field data-invalid={!!formErrors.PackageType}>
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
            {formErrors.PackageType}
          </Field>
          <Field className="mt-3">
            <Button disabled={isProcessing} type="submit">
              {isProcessing ? (
              <Spinner data-icon="inline-start" />
              ): null}
              Create
              </Button>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}