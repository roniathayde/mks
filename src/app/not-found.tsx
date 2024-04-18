import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-center">Página não encontrada</h2>
      <p className="text-center">
        Não foi possível encontrar o que você procurava
      </p>
      <Link
        href="/"
        className="mt-4 rounded bg-[#0F52BA] p-1 px-2 text-white transition-colors hover:bg-[#0F52BA]/80"
      >
        Return Home
      </Link>
    </div>
  )
}
