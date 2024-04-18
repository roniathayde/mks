'use client'

import { Dispatch, SetStateAction } from 'react'

import { Select } from '../select'
import { SelectItem } from '../select/select-item'

interface FilterSearchProps {
  setSortBy: Dispatch<SetStateAction<'id' | 'name' | 'price'>>
  setOrderBy: Dispatch<SetStateAction<'ASC' | 'DESC'>>
}
export function FilterSearch({ setSortBy, setOrderBy }: FilterSearchProps) {
  return (
    <div data-testid="filter-search" className="flex flex-col">
      <h2 className="self-start">Filtrar produtos:</h2>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row">
        <Select
          datatestid="trigger-select-sort"
          onValueChange={(e: 'id' | 'name' | 'price') => setSortBy(e)}
          defaultValue="id"
          placeholder="Organizar por..."
        >
          <SelectItem value="id" text="ID" />
          <SelectItem value="name" text="Nome" />
          <SelectItem value="price" text="Preço" />
        </Select>
        <Select
          datatestid="trigger-select-order"
          onValueChange={(e: 'ASC' | 'DESC') => setOrderBy(e)}
          defaultValue="ASC"
          placeholder="Ordenar de forma..."
        >
          <SelectItem value="DESC" text="Descendente" />
          <SelectItem value="ASC" text="Ascendente" />
        </Select>
      </div>
    </div>
  )
}
