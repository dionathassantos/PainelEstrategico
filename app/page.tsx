import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { InitiativeCard } from "@/components/initiative-card"

export default function StrategicDashboard() {
  // Sample data for initiatives
  const initiatives = [
    {
      id: "1",
      title: "1. NCPI Dissemina",
      description:
        "O NCPI Dissemina é a iniciativa voltada a ampliar a capacidade do NCPI disseminar evidências e conhecimentos científicos plurais com potencial de impacto sobre o desenho e a implementação de políticas públicas voltadas às Primeiras Infâncias....",
      responsible: "Ana Silva",
      metasCount: 11,
      statusCounts: {
        satisfatorio: 2,
        alerta: 3,
        critico: 4,
        concluido: 1,
        naoMonitorado: 1,
      },
      defaultOpen: false,
    },
    {
      id: "2",
      title: "1. NCPI Dissemina",
      description:
        "Canais e produtos voltados a levar evidências científicas para formuladores de políticas e agentes de implementação que atuam para aterrissar as políticas públicas e para desenvolver serviços públicos para as crianças na primeira infância.",
      responsible: "Ana Silva",
      metasCount: 11,
      statusCounts: {
        satisfatorio: 2,
        alerta: 3,
        critico: 4,
        concluido: 1,
        naoMonitorado: 1,
      },
      resultados: [
        {
          id: "1.1",
          title: "1.1. NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
          defaultOpen: true,
          metas: [
            {
              id: "1.1.1",
              status: "satisfatorio",
              description:
                "Manter o site do NCPI entre os 3 primeiros colocados no Google em buscas de expressões prioritárias",
              responsible: "Ana Silva",
              alcance: 78,
              date: "Abr 2025",
              parecer:
                "O site do NCPI tem mantido bom posicionamento nas buscas por palavras-chave prioritárias, mas ainda há oportunidades de melhoria para alcançar o primeiro lugar em algumas expressões específicas.",
              statusHistory: [
                {
                  date: "Jan 2025",
                  status: "alerta",
                  parecer:
                    "O site do NCPI caiu para a 5ª posição em algumas buscas importantes. É necessário revisar a estratégia de SEO urgentemente.",
                },
                {
                  date: "Fev 2025",
                  status: "alerta",
                  parecer:
                    "Após ajustes iniciais, o site recuperou algumas posições, mas ainda está abaixo da meta. Continuamos monitorando e implementando melhorias.",
                },
                {
                  date: "Mar 2025",
                  status: "satisfatorio",
                  parecer:
                    "Houve melhora significativa no posicionamento. O site agora aparece entre os 3 primeiros resultados para 70% das palavras-chave prioritárias.",
                },
              ],
              encaminhamentos: [
                {
                  id: "e1",
                  description: "Revisar estratégia de SEO para melhorar posicionamento",
                  prazo: "30/06/2025",
                  responsavel: "Ana Silva",
                },
                {
                  id: "e2",
                  description: "Implementar novas palavras-chave no site",
                  prazo: "15/07/2025",
                  responsavel: "Carlos Mendes",
                },
              ],
            },
            {
              id: "1.1.2",
              status: "alerta",
              description:
                "Aumentar a diversidade étnico-racial e regional de fontes sugeridas para entrevistas a veículos Tier 1",
              responsible: "Ana Silva",
              alcance: 37,
              date: "Abr 2025",
              parecer:
                "Houve avanço na diversidade de fontes, mas ainda estamos abaixo da meta estabelecida. É necessário ampliar o banco de especialistas e intensificar o contato com pesquisadores de diferentes regiões do país.",
              statusHistory: [
                {
                  date: "Jan 2025",
                  status: "critico",
                  parecer:
                    "Menos de 20% das fontes sugeridas representam diversidade étnico-racial e regional. Precisamos de uma estratégia mais agressiva.",
                },
                {
                  date: "Fev 2025",
                  status: "critico",
                  parecer:
                    "Iniciamos o mapeamento de novos especialistas, mas o progresso ainda é lento. Apenas 25% de diversidade alcançada.",
                },
                {
                  date: "Mar 2025",
                  status: "alerta",
                  parecer:
                    "Houve melhora para 30% de diversidade, mas ainda estamos longe da meta. O novo banco de dados de especialistas está em desenvolvimento.",
                },
              ],
              encaminhamentos: [
                {
                  id: "e3",
                  description: "Mapear novos especialistas em regiões sub-representadas",
                  prazo: "15/08/2025",
                  responsavel: "Mariana Oliveira",
                },
                {
                  id: "e4",
                  description: "Realizar workshop de mídia para novos porta-vozes",
                  prazo: "30/09/2025",
                  responsavel: "Ana Silva",
                },
              ],
            },
            {
              id: "1.1.3",
              status: "critico",
              description:
                "Obter espaço editorial fixo para ao menos 2 integrantes do CC, com diversidade étnico-racial, regional e epistemológica",
              responsible: "Ana Silva",
              alcance: 19,
              date: "Abr 2025",
              parecer:
                "Meta em situação crítica. Apenas um espaço editorial foi conquistado até o momento, e não há negociações avançadas com outros veículos. É necessário revisar a estratégia e intensificar contatos com editores.",
              statusHistory: [
                {
                  date: "Jan 2025",
                  status: "critico",
                  parecer:
                    "Nenhum espaço editorial fixo conquistado até o momento. Contatos iniciais com veículos não avançaram.",
                },
                {
                  date: "Fev 2025",
                  status: "critico",
                  parecer: "Continuamos sem avanços significativos. Estamos revisando a abordagem com os veículos.",
                },
                {
                  date: "Mar 2025",
                  status: "critico",
                  parecer:
                    "Um espaço editorial foi conquistado, mas ainda estamos longe da meta de dois espaços com diversidade.",
                },
              ],
              encaminhamentos: [
                {
                  id: "e5",
                  description: "Agendar reuniões com editores de veículos prioritários",
                  prazo: "30/07/2025",
                  responsavel: "Ana Silva",
                },
                {
                  id: "e6",
                  description: "Desenvolver propostas de colunas temáticas para apresentar aos veículos",
                  prazo: "15/08/2025",
                  responsavel: "Pedro Almeida",
                },
              ],
            },
            {
              id: "1.1.4",
              status: "concluido",
              description:
                "Aumentar base de inscrições na newsletter em X% ao ano com taxa média de abertura de 20% ao ano",
              responsible: "Ana Silva",
              alcance: 100,
              date: "Abr 2025",
              parecer:
                "Meta concluída com sucesso. A base de inscritos cresceu acima do esperado e a taxa de abertura se manteve em 23%, superando a meta de 20%. As estratégias de conteúdo e segmentação mostraram-se eficazes.",
              statusHistory: [
                {
                  date: "Jan 2025",
                  status: "satisfatorio",
                  parecer:
                    "Crescimento de inscritos está em 80% da meta, com taxa de abertura de 18%. Estamos no caminho certo.",
                },
                {
                  date: "Fev 2025",
                  status: "satisfatorio",
                  parecer:
                    "Crescimento atingiu 90% da meta e taxa de abertura subiu para 21%. Estratégias de conteúdo estão funcionando bem.",
                },
                {
                  date: "Mar 2025",
                  status: "concluido",
                  parecer:
                    "Meta atingida! Crescimento superou o esperado e taxa de abertura está em 22%. Continuaremos monitorando para manter o desempenho.",
                },
              ],
              encaminhamentos: [
                {
                  id: "e7",
                  description: "Documentar estratégias bem-sucedidas para replicação",
                  prazo: "15/07/2025",
                  responsavel: "Ana Silva",
                },
                {
                  id: "e8",
                  description: "Definir novas metas de crescimento para o próximo ciclo",
                  prazo: "30/07/2025",
                  responsavel: "Comitê Estratégico",
                },
              ],
            },
            {
              id: "1.1.5",
              status: "naoMonitorado",
              description: "5 X% de crescimento de menções ao NCPI e seus produtos na imprensa",
              responsible: "Ana Silva",
              alcance: 0,
              date: "Abr 2025",
              parecer:
                "Meta ainda não monitorada. É necessário implementar ferramentas de monitoramento de mídia para acompanhar as menções ao NCPI e seus produtos na imprensa.",
              statusHistory: [],
              encaminhamentos: [
                {
                  id: "e9",
                  description: "Contratar serviço de clipping e monitoramento de mídia",
                  prazo: "30/08/2025",
                  responsavel: "Ana Silva",
                },
                {
                  id: "e10",
                  description: "Definir linha de base e métricas de acompanhamento",
                  prazo: "15/09/2025",
                  responsavel: "Equipe de Comunicação",
                },
              ],
            },
          ],
        },
        {
          id: "1.2",
          title: "1.2. NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
          metas: [],
        },
      ],
      defaultOpen: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[#04695E] py-6">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        {/* Main Layout with Sidebar and Content */}
        <div className="flex h-[calc(100vh-3rem)]">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content Area (Cenário) */}
          <div className="flex-1 h-full bg-[#F4F4EF] rounded-tr-[80px] relative overflow-auto">
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center">
                <h1 className="text-[#04695E] text-2xl lg:text-3xl font-bold uppercase">Painel Estratégico</h1>
                <div className="w-0.5 h-10 bg-[#A6CE39] mx-4"></div>
              </div>
              <h2 className="text-[#A6CE39] text-base lg:text-lg font-medium mt-1">PORTA PARA FORA | 2025 - 2027</h2>

              {/* Two Column Layout */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-6 mt-6">
                {/* Left Column - Metrics Section */}
                <div className="flex flex-col md:w-1/3">
                  <div className="flex items-center bg-white p-3 rounded-bl-[13px] w-full">
                    <div className="mr-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 8H14M2 8L4 6M2 8L4 10"
                          stroke="#A6CE39"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[#04695E] text-sm font-medium">Iniciativas</span>
                    <span className="ml-auto text-[#04695E] text-2xl font-bold">4</span>
                  </div>

                  <div className="flex items-center bg-white p-3 rounded-bl-[13px] w-full mt-2 ml-4">
                    <div className="mr-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1L10 5.5H15L11 8.5L12.5 13L8 10L3.5 13L5 8.5L1 5.5H6L8 1Z" fill="#A6CE39" />
                      </svg>
                    </div>
                    <span className="text-[#04695E] text-sm font-medium">Resultados</span>
                    <span className="ml-auto text-[#04695E] text-2xl font-bold">8</span>
                  </div>

                  <div className="flex items-center bg-[#04695E] p-3 rounded-bl-[13px] w-full mt-2 ml-8">
                    <div className="mr-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1L10 5.5H15L11 8.5L12.5 13L8 10L3.5 13L5 8.5L1 5.5H6L8 1Z" fill="#A6CE39" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Metas</span>
                    <span className="ml-auto text-white text-2xl font-bold">42</span>
                  </div>
                </div>

                {/* Right Column - Status Section */}
                <div className="md:w-2/3 bg-[#04695E] rounded-tr-[50px] p-4 lg:p-6 text-white">
                  <div className="flex items-center mb-3">
                    <h3 className="text-sm font-bold uppercase">Status das metas</h3>
                    <div className="w-0.5 h-4 bg-[#A6CE39] mx-4"></div>
                  </div>

                  <div className="flex flex-wrap gap-4 lg:gap-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#03B71A] border-3 border-white flex items-center justify-center">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white"></div>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <span className="text-2xl lg:text-3xl font-bold">2</span>
                        <p className="text-[10px] uppercase font-bold">Satisfatório</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#EFA400] border-3 border-white flex items-center justify-center">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white"></div>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <span className="text-2xl lg:text-3xl font-bold">1</span>
                        <p className="text-[10px] uppercase font-bold">Alerta</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#FC0228] border-3 border-white flex items-center justify-center">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white"></div>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <span className="text-2xl lg:text-3xl font-bold">2</span>
                        <p className="text-[10px] uppercase font-bold">Crítico</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#01A3F7] border-3 border-white flex items-center justify-center">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white"></div>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <span className="text-2xl lg:text-3xl font-bold">5</span>
                        <p className="text-[10px] uppercase font-bold">Concluídos</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#F4F4EF] border-3 border-[#F4F4EF] flex items-center justify-center">
                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-3 border-[#58595B] flex items-center justify-center">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-[3px] border-[#58595B]"></div>
                        </div>
                      </div>
                      <div className="ml-3 lg:ml-4">
                        <span className="text-2xl lg:text-3xl font-bold">32</span>
                        <p className="text-[10px] uppercase font-bold">Não monitorados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Initiatives Section */}
              <div className="mt-6 lg:mt-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-[#04695E] text-xl lg:text-2xl font-semibold">Iniciativas</h2>
                  <button className="bg-[#0DBAAD] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs font-semibold flex items-center">
                    Nova Iniciativa
                    <div className="ml-2 w-5 h-5 rounded-full bg-[#04695E] flex items-center justify-center">
                      <span className="text-white text-lg">+</span>
                    </div>
                  </button>
                </div>

                {/* Initiatives Cards */}
                <div className="mt-4 bg-[rgba(4,105,94,0.04)] rounded-tl-[44px] p-4">
                  {initiatives.map((initiative) => (
                    <InitiativeCard key={initiative.id} {...initiative} />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex-1 h-8 relative">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#04695E]"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-full bg-[#F4DB6C] rounded-tr-full"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#A6CE39] rounded-br-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="absolute bottom-0 left-0">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Illustration"
                width={300}
                height={300}
                className="opacity-70"
              />
            </div>

            {/* Illustration */}
            <div className="absolute top-0 right-0">
              <Image
                src="/placeholder.svg?height=180&width=240"
                alt="Illustration"
                width={240}
                height={180}
                className="opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
