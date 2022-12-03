export default function Table({people} : {people: any[]}) {

    const formatVietnamCurrency = (value: any) => {
      return value && (value*1000).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    };

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
          {!!people && people.length && people.map((person: any, index: number) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{formatVietnamCurrency(person.money)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>
    )
  }
  