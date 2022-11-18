export default function Input({ id, name, type = 'number', value, placeholder, disabled = false, onChange}: { id: any; name?: string; type?: string; value: any; placeholder: string; disabled?: boolean; onChange: (e: any) => void}) {

  const onInputChanged = (e: any) => {
    onChange(e);
  };

  return (
    <input type={type} id={id} name={name} value={value} onChange={onInputChanged} disabled={disabled} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required/>
  )
}
