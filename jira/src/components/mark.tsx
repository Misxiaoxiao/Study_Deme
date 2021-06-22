import React from 'react'

export const Mark: React.FC<{ name: string, keyword: string }> = ({ name, keyword }) => {
  if (!keyword) return <>{name}</>
  const arr = name.split(keyword)
  return <>
    {
      arr.map(
        (str: string, index: number) => <span key={index}>
          {str}
          {
            index === arr.length - 1 ? null
              : <span style={{ color: '#257AFD' }}>{keyword}</span>
          }
        </span>
      )
    }
  </>
} 
