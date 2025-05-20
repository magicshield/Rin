import { useEffect, useState } from "react";

type Hitokoto = {
    hitokoto?: string,
    from?: string,
    from_who?: string
}
export function Hitokoto() {
    const [ data, setData ] = useState<Hitokoto | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            let url = 'https://v1.hitokoto.cn/';
            if (process.env.HITOKOTO_CATEGORY) {
                const param = process.env.HITOKOTO_CATEGORY
                    .split(',')
                    .map((c: string) => {
                        return 'c=' + c;
                    })
                    .join('&');
                if (param) {
                    url += '?' + param;
                }
            }
            
            const response = await fetch(url);
            const { hitokoto, from_who, from }:Hitokoto = await response.json();
            setData({ hitokoto, from_who, from });
        }
        fetchData();
    }, []);
    if (!data) {
        return null;
    }
    return (
        <p className='text-sm text-neutral-500 font-normal link-line'>{ data.hitokoto } { (data.from_who || data.from) && '——' } { data.from_who }{ (data.from && data.from != data.from_who) && ('《' + data.from + '》') }</p>
    );
}
