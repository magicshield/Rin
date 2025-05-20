import { useEffect, useState } from "react";

type Hitokoto = {
    hitokoto?: string,
    from?: string,
    from_who?: string
}
export function Hitokoto() {
    const [ data, setData ] = useState<Hitokoto | null>(null);
    useEffect(() => {
        let url = "https://v1.hitokoto.cn/";
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
        fetch(url)
            .then(response => response.json<Hitokoto>())
            .then(hitokoto => setData(hitokoto));
    }, []);
    if (!data) {
        return null;
    }
    return (
        <p className='text-sm text-neutral-500 font-normal link-line'>{ data.hitokoto } { (data.from_who || data.from) && '——' } { data.from_who }{ (data.from && data.from != data.from_who) && ('《' + data.from + '》') }</p>
    );
}
