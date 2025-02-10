"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function PresbyterForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    diocese: "",
    ordinationDate: "",
    ordinationDocument: null,
    profilePicture: null,
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
  const router = useRouter()

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, [e.target.name]: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert("Você deve concordar com os Termos de Uso e Política de Privacidade para prosseguir.")
      return
    }
    // Implement form submission logic here
    // This is a placeholder for the actual submission logic
    try {
      const response = await fetch("/api/presbyters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        router.push("/cadastro-sucesso")
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
      <Input
        type="text"
        name="diocese"
        placeholder="Diocese"
        value={formData.diocese}
        onChange={handleChange}
        required
      />
      <Input
        type="date"
        name="ordinationDate"
        placeholder="Data de Ordenação"
        value={formData.ordinationDate}
        onChange={handleChange}
        required
      />
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
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.contact.email}
          onChange={handleContactChange}
          required
        />
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
        <Label htmlFor="terms">
          Eu concordo com os{" "}
          <Link href="/termos-e-privacidade" className="text-primary hover:underline">
            Termos de Uso e Política de Privacidade
          </Link>
        </Label>
      </div>
      <Button type="submit" className="w-full">
        Enviar Cadastro
      </Button>
    </form>
  )
}

