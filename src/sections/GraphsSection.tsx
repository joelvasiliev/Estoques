"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"

// Dados simulados
const vendasData = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 3000 },
  { mes: "Mar", vendas: 5000 },
  { mes: "Abr", vendas: 4500 },
  { mes: "Mai", vendas: 6000 },
  { mes: "Jun", vendas: 5500 },
]

const ganhosLucrosData = [
  { mes: "Jan", ganhos: 5000, lucros: 2000 },
  { mes: "Fev", ganhos: 4000, lucros: 1500 },
  { mes: "Mar", ganhos: 6000, lucros: 2500 },
  { mes: "Abr", ganhos: 5500, lucros: 2200 },
  { mes: "Mai", ganhos: 7000, lucros: 3000 },
  { mes: "Jun", ganhos: 6500, lucros: 2800 },
]

const clientesPorSemanaData = [
  { semana: "Semana 1", clientes: 120 },
  { semana: "Semana 2", clientes: 150 },
  { semana: "Semana 3", clientes: 180 },
  { semana: "Semana 4", clientes: 200 },
]

export function GraphsSection() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Vendas</h1>
      <div className="grid grid-cols-2 gap-12 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Vendas Mensais</CardTitle>
          <CardDescription>Total de vendas por mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              vendas: {
                label: "Vendas",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={vendasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="vendas" stroke="var(--color-vendas)" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganhos vs Lucros</CardTitle>
          <CardDescription>Comparação mensal entre ganhos e lucros</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              ganhos: {
                label: "Ganhos",
                color: "hsl(var(--chart-2))",
              },
              lucros: {
                label: "Lucros",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ganhosLucrosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="ganhos" fill="var(--color-ganhos)" />
                <Bar dataKey="lucros" fill="var(--color-lucros)" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clientes por Semana</CardTitle>
          <CardDescription>Número de clientes atendidos por semana</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              clientes: {
                label: "Clientes",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={clientesPorSemanaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="clientes" stroke="var(--color-clientes)" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}