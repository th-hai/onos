export default function Table({people} : {people: any[]}) {

    return (
      <>
      <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr className="bg-red-900">
            <th>Tên</th>
            <th>Tiền</th>
          </tr>
        </thead>
        <tbody>
          {people.length && people.map((person: any, index: number) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.money}.000 ₫</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>
    )
  }
  