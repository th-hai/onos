export default function InputUnit({ id, name, type = 'number', value, placeholder, disabled = false, onChange}: { id: any; name?: string; type?: string; value: any; placeholder: string; disabled?: boolean; onChange: (e: any) => void}) {

  const onInputChanged = (e: any) => {
    onChange(e);
  };

  return (
    <div className="inline-flex justify-between bg-gray-100 rounded border border-gray-200 mb-2 w-full">
      <div className="inline w-16 bg-gray-200 py-2 px-3 text-gray-600 select-none">{name}</div>
      <input type={type} min={0} id={id} name={name} value={value} onChange={onInputChanged} disabled={disabled} className="min-[530px]:min-w-[355px] bg-transparent py-1 text-gray-600 px-4 focus:outline-none" placeholder={placeholder} required/>
      <div className="inline bg-gray-200 py-2 px-4 text-gray-600 select-none">.000 ₫</div>
    </div>
  )
}
