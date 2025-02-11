"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import type React from "react"

export default function PresbyterForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    diocese: "",
    ordinationDate: "",
    ordinationDocument: null as string | null,
    profilePicture: null as string | null,
    bio: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
    contact: {
      email: "",
      phone: "",
    },
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value },
    }))
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (result.success) {
          setFormData((prev) => ({
            ...prev,
            [e.target.name]: `/uploads/${result.filename}`,
          }))

          toast({
            title: "Arquivo enviado com sucesso",
            description: "O arquivo foi carregado e associado ao seu cadastro.",
          })
        } else {
          throw new Error("Falha ao enviar o arquivo")
        }
      } catch (error) {
        console.error("Error uploading file:", error)
        toast({
          title: "Erro ao enviar arquivo",
          description: "Ocorreu um erro ao tentar enviar o arquivo. Por favor, tente novamente.",
          variant: "destructive",
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = "Nome é obrigatório"
    if (!formData.type) newErrors.type = "Tipo é obrigatório"
    if (!formData.diocese) newErrors.diocese = "Diocese é obrigatória"
    if (!formData.ordinationDate) newErrors.ordinationDate = "Data de ordenação é obrigatória"
    if (!formData.contact.email) newErrors.email = "Email é obrigatório"
    if (!agreeTerms) newErrors.terms = "Você deve concordar com os termos"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/presbyters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast({
          title: "Cadastro enviado com sucesso!",
          description: "Seu cadastro será analisado em breve.",
        })
        router.push("/cadastro-sucesso")
      } else {
        throw new Error("Falha ao enviar o cadastro")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Erro ao enviar cadastro",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} required>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="padre">Padre</SelectItem>
          <SelectItem value="bispo">Bispo</SelectItem>
          <SelectItem value="diacono">Diácono</SelectItem>
        </SelectContent>
      </Select>
      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
      <div>
        <Input
          type="text"
          name="diocese"
          placeholder="Diocese"
          value={formData.diocese}
          onChange={handleChange}
          className={errors.diocese ? "border-red-500" : ""}
          required
        />
        {errors.diocese && <p className="text-red-500 text-sm mt-1">{errors.diocese}</p>}
      </div>
      <div>
        <Input
          type="date"
          name="ordinationDate"
          placeholder="Data de Ordenação"
          value={formData.ordinationDate}
          onChange={handleChange}
          className={errors.ordinationDate ? "border-red-500" : ""}
          required
        />
        {errors.ordinationDate && <p className="text-red-500 text-sm mt-1">{errors.ordinationDate}</p>}
      </div>
      <Input type="file" name="ordinationDocument" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <Input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />
      <Textarea name="bio" placeholder="Biografia" value={formData.bio} onChange={handleChange} />
      <div className="space-y-2">
        <Input
          type="text"
          name="facebook"
          placeholder="Facebook"
          value={formData.socialMedia.facebook}
          onChange={handleSocialMediaChange}
        />
        <Input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={formData.socialMedia.twitter}
          onChange={handleSocialMediaChange}
        />
        <Input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={formData.socialMedia.instagram}
          onChange={handleSocialMediaChange}
        />
      </div>
      <div className="space-y-2">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.contact.email}
            onChange={handleContactChange}
            className={errors.email ? "border-red-500" : ""}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <Input
          type="tel"
          name="phone"
          placeholder="Telefone"
          value={formData.contact.phone}
          onChange={handleContactChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
        <Label htmlFor="terms" className={errors.terms ? "text-red-500" : ""}>
          Eu concordo com os{" "}
          <Link href="/termos-e-privacidade" className="text-primary hover:underline">
            Termos de Uso e Política de Privacidade
          </Link>
        </Label>
      </div>
      {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
      </Button>
    </form>
  )
}

