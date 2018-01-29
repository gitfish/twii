class SelectionHelper {
    public static toggleItem<T>(items: T[], item: T) {
        if(items) {
            const idx = items.indexOf(item);
            if(idx >= 0) {
                items.splice(idx, 1);
            } else {
                items.push(item);
            }
        }
    }
}

export { SelectionHelper as default, SelectionHelper };