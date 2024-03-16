export const prefixCls = (prefixCls: string) => {
    return (cls?: string) => {
        let nextClass = prefixCls;
        if (!cls) {
            return nextClass;
        }
        return `${prefixCls}-${cls}`;
    };
};
