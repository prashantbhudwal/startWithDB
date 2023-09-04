"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
const grades = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
] as const;

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Minimum 3 characters are allowed",
    })
    .max(10, {
      message: "Maximum 10 characters are allowed",
    }),
  age: z.coerce
    .number()
    .positive({
      message: "Age must be a positive number",
    })
    .int({
      message: "Age must be an integer",
    })
    .min(18, { message: "You must be at least 18" }),
  grade: z.enum(grades),
  email: z.string().email({
    message: "Enter a valid email",
  }),
  website: z.string().url({
    message: "Enter a valid URL",
  }),
  bio: z.string().min(10, {
    message: "Minimum 10 characters needed.",
  }),
});

export default function ZodForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 18,
      grade: "Grade 1",
      email: "your@email.com",
      website: "",
      bio: "Type in your bio",
    },
  });
  const watch = form.watch();

  const watchHook = useWatch({
    control: form.control,
    defaultValue: form.getValues(),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="What IZ NAME" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Age" {...field} type="number" />
              </FormControl>
              <FormDescription>Type in your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Type in your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Type in your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
        <pre>{JSON.stringify(watch, null, 2)}</pre>
        <pre>{JSON.stringify(watchHook, null, 2)}</pre>
      </form>
    </Form>
  );
}
