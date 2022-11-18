export default function Table({people} : {people: any[]}) {

    return (
      <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tiền</th>
          </tr>
        </thead>
        <tbody>
          {people.length && people.map((person: any) => (
            <tr>
              <td>{person.name}</td>
              <td>{person.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }
  