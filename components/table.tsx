export default function Table({ people }: { people: any[] }) {
  const formatVietnamCurrency = (value: any) => {
    return value && (value * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <>
      <div className="overflow-x-auto w-full rounded-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Tên</th>
              <th>Tiền</th>
            </tr>
          </thead>
          <tbody>
            {!!people &&
              people.length > 0 &&
              people.map((person: any, index: number) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: person.money >= 0 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)', // Conditional background color
                  }} // Conditional class based on money value
                >
                  <td>{person.name}</td>
                  <td>{formatVietnamCurrency(person.money)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
