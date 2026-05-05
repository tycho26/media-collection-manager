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

export default function CreateMedia() {
  const PackageTypesSelectOptions = Object.keys(PackageType) as Array<keyof typeof PackageType>;
  const PackageTypesListItems = PackageTypesSelectOptions.map((pkgType) => (
    <SelectItem key={pkgType} value={pkgType}>
      {pkgType}
    </SelectItem>
  ));

  const [isProcessing, setProcessing] = useState(false);
  
  async function createMedia(formData: FormData) {
    setProcessing(true)
    await mediaCreate(formData);
    setProcessing(false)
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