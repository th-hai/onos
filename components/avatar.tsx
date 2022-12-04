import Image from 'next/image';

export default function Avatar ({src, alt, size = 70, className = '', onClick}: {src: string; alt: string; size?: number; className?: string; onClick: (e: any) => void}) {
    
    const handleClick = (e: any) => {
        onClick(e);
    };

    return (
    <Image
        src={src}
        alt={alt}
        onClick={(e) => handleClick(e)}
        width={size}
        height={size}
        className={`inline-block avatar-image ml-4 mt-10 min-[320px]:m-0 min-[320px]:w-28 hover:scale-110 hover:border-2 rounded-full ${className}`}
    />
    );
};