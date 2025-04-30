// Serviço para validação de documentos
export const DocumentService = {
  // Validar documentos
  validateDocuments: async (idDocument: File, selfie: File) => {
    try {
      const formData = new FormData()
      formData.append("idDocument", idDocument)
      formData.append("selfie", selfie)

      const response = await fetch("/api/validate-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha na validação de documentos")
      }

      return data
    } catch (error) {
      console.error("Erro na validação de documentos:", error)
      throw error
    }
  },
}
