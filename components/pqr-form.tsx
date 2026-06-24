"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { municipios } from "@/lib/data"

const pqrSchema = z.object({
  tipo: z.enum(["Peticion", "Queja", "Reclamo", "Sugerencia"], {
    required_error: "Selecciona el tipo de solicitud.",
  }),
  municipioId: z.string({ required_error: "Selecciona un municipio." }).min(1, "Selecciona un municipio."),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  telefono: z.string().min(7, "Ingresa un número de teléfono válido."),
  cedula: z.string().min(6, "Ingresa un número de cédula válido."),
  asunto: z.string().min(10, "El asunto debe tener al menos 10 caracteres."),
  descripcion: z
    .string()
    .min(30, "La descripción debe tener al menos 30 caracteres.")
    .max(2000, "La descripción no puede superar los 2000 caracteres."),
})

type PQRFormValues = z.infer<typeof pqrSchema>

function generateId() {
  return "PQR-" + Date.now().toString(36).toUpperCase()
}

export function PQRForm() {
  const [submitted, setSubmitted] = useState(false)
  const [radicadoId, setRadicadoId] = useState("")

  const form = useForm<PQRFormValues>({
    resolver: zodResolver(pqrSchema),
    defaultValues: {
      tipo: undefined,
      municipioId: "",
      nombre: "",
      email: "",
      telefono: "",
      cedula: "",
      asunto: "",
      descripcion: "",
    },
  })

  function onSubmit(values: PQRFormValues) {
    const id = generateId()
    const pqr = {
      id,
      ...values,
      estado: "Pendiente",
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    // Persist to localStorage (demo mode)
    const existing = JSON.parse(localStorage.getItem("pqrs") ?? "[]")
    localStorage.setItem("pqrs", JSON.stringify([...existing, pqr]))

    setRadicadoId(id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-5 rounded-xl border border-border bg-card p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
          <CheckCircle className="h-9 w-9 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">PQR radicada exitosamente</h2>
          <p className="mt-1 text-muted-foreground">
            Tu solicitud ha sido recibida. Número de radicado:
          </p>
          <p className="mt-2 text-2xl font-mono font-bold text-primary">{radicadoId}</p>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Guarda este número de radicado. Recibirás una respuesta al correo registrado en un plazo
          máximo de 15 días hábiles.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            form.reset()
            setSubmitted(false)
          }}
        >
          Radicar otra PQR
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Formulario de radicación
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Tipo y municipio */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de solicitud</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Peticion">Petición</SelectItem>
                      <SelectItem value="Queja">Queja</SelectItem>
                      <SelectItem value="Reclamo">Reclamo</SelectItem>
                      <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="municipioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {municipios.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Nombre */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: María Fernanda Gómez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email y teléfono */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="3101234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cédula */}
          <FormField
            control={form.control}
            name="cedula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de cédula</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asunto */}
          <FormField
            control={form.control}
            name="asunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asunto</FormLabel>
                <FormControl>
                  <Input placeholder="Resumen breve de tu solicitud" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descripción */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descripción{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    ({field.value?.length ?? 0}/2000)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Describe detalladamente tu petición, queja, reclamo o sugerencia..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Radicar PQR"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Al enviar, aceptas el tratamiento de tus datos conforme a la Ley 1581 de 2012.
          </p>
        </form>
      </Form>
    </div>
  )
}
