import React, { useMemo } from "react"

const Table = (props) => {
  const { headers, data } = props

  const sortedData = useMemo(() => {
    return data.sort((a, b) => b.clicks - a.clicks)
  }, [data])

  return (
    <table className="min-w-full mt-2">
      <thead className="border-b">
        <tr>
          {headers.map((head) => {
            return (
              <th
                key={head}
                scope="col"
                className="text-sm text-gray-900 px-4 py-2 font-semibold text-center"
              >
                {head}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((obj) => {
          return (
            <tr key={obj.source} className={`border-b text-center ${props.capitalize ? "capitalize" : ""}`}>
              <td className="text-sm text-gray-900 px-4 py-2 whitespace-nowrap">
                {obj.source}
              </td>
              <td className="text-sm text-gray-900 px-4 py-2 whitespace-nowrap">
                {obj.clicks}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
