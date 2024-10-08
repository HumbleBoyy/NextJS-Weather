import { cn } from '@/utils/cn'
import React from 'react'

type Props = {}

function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}className={cn('w-full bg-blue-700 border rounded-xl flex py-4 shadow-sm', props.className)}/>
  )
}

export default Container