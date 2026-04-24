package com.argo.ecommerce.dto.response;

import java.util.List;

public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
    private boolean first;

    public PageResponse() {}
    public List<T> getContent() { return content; }
    public int getPage() { return page; }
    public int getSize() { return size; }
    public long getTotalElements() { return totalElements; }
    public int getTotalPages() { return totalPages; }
    public boolean isLast() { return last; }
    public boolean isFirst() { return first; }

    public static <T> Builder<T> builder() { return new Builder<>(); }

    public static class Builder<T> {
        private final PageResponse<T> r = new PageResponse<>();
        public Builder<T> content(List<T> v) { r.content = v; return this; }
        public Builder<T> page(int v) { r.page = v; return this; }
        public Builder<T> size(int v) { r.size = v; return this; }
        public Builder<T> totalElements(long v) { r.totalElements = v; return this; }
        public Builder<T> totalPages(int v) { r.totalPages = v; return this; }
        public Builder<T> last(boolean v) { r.last = v; return this; }
        public Builder<T> first(boolean v) { r.first = v; return this; }
        public PageResponse<T> build() { return r; }
    }
}
