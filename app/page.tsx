import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Users, Shield, Activity } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <Image src="/images/furia-icon.png" alt="FURIA Esports Logo" width={120} height={64} className="h-16 mb-4" priority />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Know Your Fan</h1>
            <p className="text-lg md:text-xl mb-6 max-w-xl">
              Conecte-se com a FURIA Esports e receba experiências exclusivas baseadas no seu perfil de fã.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#00a859] hover:bg-[#008a49] text-white">
                <Link href="/register">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-gray-500"
              >
                <Link href="/about">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image src="/images/furia-adidas-banner.png" alt="FURIA Esports Fans" width={800} height={400} className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#00a859]" />}
              title="Perfil Completo"
              description="Cadastre suas informações básicas e preferências para uma experiência personalizada."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-[#00a859]" />}
              title="Verificação Segura"
              description="Faça upload de documentos com validação por IA para garantir a segurança da sua conta."
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-[#00a859]" />}
              title="Conexão Social"
              description="Vincule suas redes sociais para compartilhar sua paixão pela FURIA."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-[#00a859]" />}
              title="Recompensas Exclusivas"
              description="Ganhe acesso a conteúdos, eventos e produtos exclusivos para fãs verificados."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Faça Parte da Família FURIA</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Quanto mais completo seu perfil, mais personalizadas serão suas experiências como fã.
          </p>
          <Button asChild size="lg" className="bg-white text-[#00a859] hover:bg-gray-100">
            <Link href="/register">Criar Meu Perfil</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/images/furia-icon.png" alt="FURIA Esports Logo" width={80} height={40} className="h-10 mb-2" />
              <p className="text-sm text-black">© 2024 FURIA Esports. Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-black hover:text-gray-500">
                Termos de Uso
              </Link>
              <Link href="#" className="text-black hover:text-gray-500">
                Privacidade
              </Link>
              <Link href="#" className="text-black hover:text-gray-500">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
