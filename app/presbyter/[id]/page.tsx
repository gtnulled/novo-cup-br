import { notFound } from "next/navigation"
import Image from "next/image"
import { getPresbyterById } from "@/lib/presbyters"

export default async function PresbyterProfile({ params }: { params: { id: string } }) {
  const presbyter = await getPresbyterById(params.id)

  if (!presbyter) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <Image
            src={presbyter.profilePicture || "/placeholder.png"}
            alt={presbyter.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{presbyter.name}</h1>
            <p className="text-gray-600">
              {presbyter.type} - {presbyter.diocese}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Biografia</h2>
          <p>{presbyter.bio}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Informações</h2>
          <p>Data de Ordenação: {new Date(presbyter.ordinationDate).toLocaleDateString()}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Contato</h2>
          <p>Email: {presbyter.contact.email}</p>
          <p>Telefone: {presbyter.contact.phone}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Redes Sociais</h2>
          <ul>
            {Object.entries(presbyter.socialMedia).map(
              ([platform, url]) =>
                url && (
                  <li key={platform}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {platform}
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

