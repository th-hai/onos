export default function Avatar ({src, alt, size = 10, className = '', onClick}: {src: string; alt: string; size?: number; className?: string; onClick: (e: any) => void}) {
    
    const handleClick = (e: any) => {
        onClick(e);
    };

    return (
    <img
        src={src}
        alt={alt}
        onClick={(e) => handleClick(e)}

        className={`inline-block test h-32 w-32 ml-4 mt-10 hover:scale-125 hover:border-2 rounded-full ${className}`}
    />
    );
};