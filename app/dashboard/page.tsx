"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Trophy, Users, ShoppingBag, Bell, BarChart3, User, Settings, LogOut } from "lucide-react"
import { ProductCard } from "@/components/store/ProductCard"
import Image from "next/image"

// --- Instagram Community Section ---

interface InstagramProfile {
  username: string;
  name: string;
  verified?: boolean;
  url: string;
  followers: string;
  posts: number;
  avatar: string;
  badge?: boolean;
  images: string[];
  platformIcon: React.ReactNode;
  tiktokVideos?: string[];
}

const instagramProfiles: InstagramProfile[] = [
  {
    username: "furiagg",
    name: "FURIA",
    verified: true,
    url: "https://instagram.com/furiagg",
    followers: "900 mil",
    posts: 4936,
    avatar: "/images/furia-icon3.png",
    badge: true,
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
      "/images/image5.png",
      "/images/image6.png",
    ],
    platformIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#fff"/><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75Zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25Zm5.25-1.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 6.75Z" fill="#E1306C"/></svg>
    ),
  },
  {
    username: "furia.apparel",
    name: "FURIA APPAREL",
    verified: false,
    url: "https://instagram.com/furia.apparel",
    followers: "7.763",
    posts: 220,
    avatar: "/images/furia-icon3.png",
    badge: false,
    images: [
      "/images/image7.png",
      "/images/image8.png",
      "/images/image9.png",
      "/images/image10.png",
      "/images/image11.png",
      "/images/image12.png",
    ],
    platformIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#fff"/><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75Zm0 1.5A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25Zm5.25-1.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 6.75Z" fill="#E1306C"/></svg>
    ),
  },
  {
    username: "furla",
    name: "furla",
    verified: true,
    url: "https://www.tiktok.com/@furia?referer_url=adidas.furia.gg%2F&refer=creator_embed&embed_source=121374463%2C121468991%2C121439635%2C121433650%2C121404359%2C121497414%2C121477481%2C121351166%2C121487028%2C73347566%2C121331973%2C120811592%2C120810756%2C121503376%3Bnull%3Bembed_creator_card",
    followers: "263.9K",
    posts: 9600000,
    avatar: "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/9bb29440d19acd975cb1db1175368fac~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=f4acb57b&x-expires=1746151200&x-signature=HL06VM0Zmzkcn5ey2E53GGEd0K8%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva",
    badge: true,
    images: [
      "/images/image13.png",
      "/images/image14.png",
    ],
    tiktokVideos: [
      "https://www.tiktok.com/@furia/video/7135856801035160838",
      "https://www.tiktok.com/@furia/video/7112848061231090950"
    ],
    platformIcon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fff"/><path d="M34.5 21.5c-2.2 0-4-1.8-4-4V13h-3v18.5c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.4.2 2 .6V25c-.6-.2-1.3-.3-2-.3-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V21.5h1c1.7 0 3.3-.6 4.5-1.6v-2.4c-1.2 1-2.8 1.6-4.5 1.6z" fill="#25F4EE"/><path d="M34.5 21.5c-2.2 0-4-1.8-4-4V13h-3v18.5c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.4.2 2 .6V25c-.6-.2-1.3-.3-2-.3-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V21.5h1c1.7 0 3.3-.6 4.5-1.6v-2.4c-1.2 1-2.8 1.6-4.5 1.6z" fill="#010101"/><path d="M34.5 21.5c-2.2 0-4-1.8-4-4V13h-3v18.5c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.4.2 2 .6V25c-.6-.2-1.3-.3-2-.3-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V21.5h1c1.7 0 3.3-.6 4.5-1.6v-2.4c-1.2 1-2.8 1.6-4.5 1.6z" fill="#FE2C55"/></svg>
    ),
  },
];

function InstagramProfileCard({ username, name, verified, url, followers, posts, avatar, images, platformIcon, tiktokVideos }: InstagramProfile) {
  // Detecta se é TikTok pelo nome do usuário ou URL
  const isTikTok = url.includes('tiktok.com');
  return (
    <div className="rounded-2xl shadow-lg bg-white p-6 flex flex-col w-full max-w-xs mx-auto border border-gray-200 hover:shadow-2xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full border-2 border-[#00a859] bg-white" />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-lg">{username}</span>
              {verified && <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12l-2-2v-2a2 2 0 0 0-2-2h-2l-2-2-2 2h-2a2 2 0 0 0-2 2v2l-2 2 2 2v2a2 2 0 0 0 2 2h2l2 2 2-2h2a2 2 0 0 0 2-2v-2z"/></svg>}
            </div>
            <span className="text-xs text-gray-500 font-medium">{name}</span>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" title={isTikTok ? "Ver no TikTok" : "Ver no Instagram"}>
          {platformIcon}
        </a>
      </div>
      <div className="text-sm text-gray-700 mb-1 font-medium">{followers} seguidores</div>
      <div className="text-xs text-gray-500 mb-3">
        {isTikTok
          ? `${posts.toLocaleString()} curtidas`
          : `${posts.toLocaleString()} publicações`}
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
        {images.map((img: string, idx: number) => (
          <img key={idx} src={img} alt={isTikTok ? `TikTok vídeo ${idx+1}` : `Instagram post ${idx+1}`} className="aspect-square object-cover w-full h-full bg-gray-100" />
        ))}
      </div>
      {isTikTok && tiktokVideos && tiktokVideos.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="text-xs text-gray-500 text-center font-semibold">Vídeos do TikTok</div>
          <div className="flex gap-2 justify-center">
            {tiktokVideos.map((link: string, idx: number) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1 bg-[#25F4EE] hover:bg-[#FE2C55] text-white rounded-full text-xs font-bold transition-colors duration-150 shadow"
                title={`Ver vídeo TikTok ${idx+1}`}
              >
                TikTok #{idx+1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components and Types ---

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
function SidebarLink({ icon, label, active = false, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md transition-colors ${active ? "bg-[#00a859] bg-opacity-10 text-[#00a859]" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <span className={active ? "text-[#00a859]" : "text-gray-500"}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  progress?: number;
}
function StatCard({ icon, title, value, description, progress }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
        {progress !== undefined && <Progress value={progress} className="h-1 mt-2 bg-gray-100" />}
      </CardContent>
    </Card>
  )
}

interface EventItemProps {
  title: string;
  date: string;
  type: string;
  status: string;
}
function EventItem({ title, date, type, status }: EventItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">
          {date} • {type}
        </p>
      </div>
      <div>
        {status === "recommended" && (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-0">Recomendado</Badge>
        )}
        {status === "exclusive" && (
          <Badge className="bg-[#00a859] bg-opacity-20 text-[#00a859] hover:bg-opacity-20 border-0">Exclusivo</Badge>
        )}
        {status === "open" && <Badge variant="outline">Aberto</Badge>}
      </div>
    </div>
  )
}

interface RewardItemProps {
  title: string;
  points: number;
  expires: string;
  exclusive?: boolean;
}
function RewardItem({ title, points, expires, exclusive = false }: RewardItemProps) {
  return (
    <div className="border-b pb-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium">{title}</h3>
        {exclusive && (
          <Badge className="bg-[#00a859] bg-opacity-20 text-[#00a859] hover:bg-opacity-20 border-0 text-xs">
            Exclusivo
          </Badge>
        )}
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-gray-500">{points} pontos</p>
        <p className="text-gray-500">Expira em {expires}</p>
      </div>
    </div>
  )
}

interface GameInterestBarProps {
  game: string;
  percentage: number;
}
function GameInterestBar({ game, percentage }: GameInterestBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{game}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="bg-[#00a859] h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

interface SocialEngagementCardProps {
  platform: string;
  interactions: number;
  sentiment: string;
  notConnected?: boolean;
}
function SocialEngagementCard({ platform, interactions, sentiment, notConnected = false }: SocialEngagementCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${notConnected ? "bg-gray-50" : "bg-white"}`}>
      <h3 className="font-medium mb-2">{platform}</h3>
      {!notConnected ? (
        <>
          <p className="text-sm text-gray-500">
            <span className="font-medium">{interactions}</span> interações
          </p>
          <p className="text-sm text-gray-500">
            Sentimento: <span className="font-medium">{sentiment}</span>
          </p>
        </>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-2">{sentiment}</p>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Conectar
          </Button>
        </div>
      )}
    </div>
  )
}

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "rewards" | "community" | "store" | "notifications" | "settings">("overview")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock de produtos para a loja
  const products = [
    {
      id: 1,
      name: "CAMISETA FURIA OFICIAL '24 PRETA",
      image: "/images/CAMISETA_24.png",
      price: "R$ 259,00",
    },
    {
      id: 2,
      name: "CAMISETA FURIA | ADIDAS PRETA",
      image: "/images/CAMISETA_ADIDAS.png",
      price: "R$ 299,00",
    },
    {
      id: 3,
      name: "CAMISETA OFICIAL FURIA | ADIDAS PRETA",
      image: "/images/CAMISETA_OFICIAL.png",
      price: "R$ 359,00",
    },
    {
      id: 4,
      name: "CAMISETA FURIA CLASSIC PRETA",
      image: "/images/CAMISETA_CLASSIC.png",
      price: "R$ 139,00",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a859] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r min-h-screen p-2">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex justify-end">
              {/* Botão de alternância de tema removido */}
            </div>
            <div className="flex flex-row items-center justify-center gap-3 mb-6">
              <Image src="/images/furia-logo.png" alt="FURIA Esports Logo" width={48} height={48} className="transition-all drop-shadow-lg dark:invert max-h-12 object-contain" />
              <img src="https://furiagg.fbitsstatic.net/sf/img/logo-furia.svg?theme=main&v=202503132055" alt="FURIA Logo SVG" width={88} height={48} className="object-contain max-h-12" />
            </div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Fã Furia</p>
                <Badge variant="outline" className="bg-[#00a859] text-white border-0">
                  Nível Ouro
                </Badge>
              </div>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            <SidebarLink
              icon={<BarChart3 />}
              label="Visão Geral"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarLink
              icon={<Calendar />}
              label="Eventos"
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            />
            <SidebarLink
              icon={<Trophy />}
              label="Recompensas"
              active={activeTab === "rewards"}
              onClick={() => setActiveTab("rewards")}
            />
            <SidebarLink
              icon={<Users />}
              label="Comunidade"
              active={activeTab === "community"}
              onClick={() => setActiveTab("community")}
            />
            <SidebarLink
              icon={<ShoppingBag />}
              label="Loja"
              active={activeTab === "store"}
              onClick={() => setActiveTab("store")}
            />
            <SidebarLink
              icon={<Bell />}
              label="Notificações"
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            />
          </nav>

          <div className="pt-4 border-t">
            <SidebarLink
              icon={<Settings />}
              label="Configurações"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
            <SidebarLink icon={<LogOut />} label="Sair" onClick={() => {}} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Dashboard do Fã</h1>
              <p className="text-gray-600">Bem-vindo ao seu dashboard personalizado da FURIA Esports</p>
            </div>
            {/* Blocos de abas renderizados condicionalmente */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* ...restante do conteúdo da aba overview... */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                      icon={<Trophy className="h-5 w-5 text-[#00a859]" />}
                      title="Nível de Fã"
                      value="Ouro"
                      description="75% do perfil completo"
                      progress={75}
                    />
                    <StatCard
                      icon={<Calendar className="h-5 w-5 text-[#00a859]" />}
                      title="Eventos"
                      value="3"
                      description="Participados nos últimos 12 meses"
                    />
                    <StatCard
                      icon={<ShoppingBag className="h-5 w-5 text-[#00a859]" />}
                      title="Compras"
                      value="2"
                      description="Produtos adquiridos"
                    />
                    <StatCard
                      icon={<Users className="h-5 w-5 text-[#00a859]" />}
                      title="Redes Sociais"
                      value="2/3"
                      description="Conectadas e analisadas"
                      progress={66}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Próximos Eventos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <EventItem
                            title="FURIA vs. NAVI - ESL Pro League"
                            date="15 de Junho, 2024"
                            type="Online"
                            status="recommended"
                          />
                          <EventItem
                            title="Meet & Greet com Jogadores de CS:GO"
                            date="22 de Junho, 2024"
                            type="São Paulo, SP"
                            status="exclusive"
                          />
                          <EventItem
                            title="FURIA Valorant Showmatch"
                            date="30 de Junho, 2024"
                            type="Online"
                            status="open"
                          />
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          Ver Todos os Eventos
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recompensas Disponíveis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <RewardItem title="15% de desconto na loja oficial" points={500} expires="30 dias" />
                          <RewardItem title="Acesso antecipado a ingressos" points={1000} expires="60 dias" />
                          <RewardItem title="Chamada de vídeo com jogador" points={2500} expires="90 dias" exclusive />
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          Ver Todas as Recompensas
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Análise de Engajamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Interesses por Jogo</h3>
                          <div className="space-y-2">
                            <GameInterestBar game="CS:GO" percentage={80} />
                            <GameInterestBar game="Valorant" percentage={60} />
                            <GameInterestBar game="League of Legends" percentage={30} />
                            <GameInterestBar game="Rainbow Six" percentage={20} />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Engajamento em Redes Sociais</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <SocialEngagementCard platform="Twitter" interactions={15} sentiment="Positivo" />
                            <SocialEngagementCard platform="Steam" interactions={8} sentiment="Neutro" />
                            <SocialEngagementCard
                              platform="Discord"
                              interactions={0}
                              sentiment="Não conectado"
                              notConnected
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeTab === "events" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Próximos Eventos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-center justify-between border-b pb-2">
                          <div>
                            <h3 className="font-semibold">CBLOL 2025 - Etapa 1</h3>
                            <p className="text-sm text-gray-500">12/05/2025 • Presencial/SP</p>
                          </div>
                          <Button variant="outline" size="sm" className="font-bold">Ver detalhes</Button>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <div>
                            <h3 className="font-semibold">FURIA Fan Fest</h3>
                            <p className="text-sm text-gray-500">25/05/2025 • Online</p>
                          </div>
                          <Button variant="outline" size="sm" className="font-bold">Ingressos</Button>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <div>
                            <h3 className="font-semibold">CS2 Major - Paris</h3>
                            <p className="text-sm text-gray-500">30/06/2025 • Internacional</p>
                          </div>
                          <Button variant="outline" size="sm" className="font-bold">Acompanhar</Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeTab === "rewards" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recompensas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <RewardItem title="15% de desconto na loja oficial" points={500} expires="30 dias" />
                        <RewardItem title="Acesso antecipado a ingressos" points={1000} expires="60 dias" />
                        <RewardItem title="Chamada de vídeo com jogador" points={2500} expires="90 dias" exclusive />
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Ver Todas as Recompensas
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeTab === "community" && (
                <div>
                  <h2 className="text-2xl font-bold text-center mb-8">SEJA FURIA!</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {instagramProfiles.map((profile) => (
                      <InstagramProfileCard key={profile.username} {...profile} />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "store" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Loja FURIA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {/* Botão flutuante para a loja oficial */}
                  <a
                    href="https://www.furia.gg/produtos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-8 right-8 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition font-bold text-base flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    Ver mais produtos na loja oficial
                  </a>
                </div>
              )}
              {activeTab === "notifications" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notificações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-[#00a859]" />
                          <span className="text-sm">Novo evento disponível: CBLOL 2025</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">Você desbloqueou a conquista “Torcedor Raiz”!</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-black" />
                          <span className="text-sm">Promoção ativa na loja: camisetas com 10% OFF</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
