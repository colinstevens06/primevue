/**
 *
 * TreeTable is used to display hierarchical data in tabular format.
 *
 * [Live Demo](https://www.primevue.org/treetable/)
 *
 * @module treetable
 *
 */
import { VNode } from 'vue';
import { TreeNode } from '../tree';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

/**
 * Custom treetable filter metadata.
 */
export interface TreeTableFilterMetaData {
    /**
     * Filter value
     */
    value: any;
    /**
     * Filter match mode
     */
    matchMode: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | string | undefined;
}

/**
 * Custom operator filter metadata.
 */
export interface TreeTableOperatorFilterMetaData {
    /**
     * Filter operator
     */
    operator: string;
    /**
     * Array of filter meta datas.
     * @see TreeTableFilterMetaData
     */
    constraints: TreeTableFilterMetaData[];
}

/**
 * Custom filter metadata.
 */
export interface TreeTableFilterMeta {
    /**
     * Filter keys
     * @see TreeTableFilterMetaData
     */
    [key: string]: string | TreeTableFilterMetaData | TreeTableOperatorFilterMetaData;
}

/**
 * Custom sort event.
 * @see {@link TreeTableEmits.sort}
 */
export interface TreeTableSortEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Index of first record
     */
    first: number;
    /**
     * Number of rows to display in new page
     */
    rows: number;
    /**
     * Field to sort against
     */
    sortField: string | ((item: any) => string) | undefined;
    /**
     * Sort order as integer
     */
    sortOrder: 1 | 0 | -1 | undefined | null;
    /**
     * MultiSort metadata
     */
    multiSortMeta: TreeTableSortMeta[] | undefined | null;
    /**
     * Collection of active filters
     * @see TreeTableFilterMeta
     */
    filters: TreeTableFilterMeta;
    /**
     * Match modes per field
     */
    filterMatchModes: 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | string | undefined;
}

/**
 * Custom page event.
 * @see {@link TreeTableEmits.sort}
 * @extends TreeTableSortEvent
 */
export interface TreeTablePageEvent extends TreeTableSortEvent {
    /**
     * New page number
     */
    page: number;
    /**
     * Total page count
     */
    pageCount: number;
}

/**
 * Custom filter event.
 * @see {@link TreeTableEmits.sort}
 * @extends TreeTableSortEvent
 */
export interface TreeTableFilterEvent extends TreeTableSortEvent {
    /**
     * Filtered collection (non-lazy only)
     */
    filteredValue: any;
}

/**
 * Custom sort metadata.
 */
export interface TreeTableSortMeta {
    /**
     * Column field
     */
    field: string;
    /**
     * Column sort order
     */
    order: 1 | 0 | -1 | undefined | null;
}

/**
 * Custom expanded keys metadata.
 */
export interface TreeTableExpandedKeys {
    /**
     * Optional
     */
    [key: string]: any;
}

/**
 * Custom selection keys metadata.
 */
export interface TreeTableSelectionKeys {
    /**
     * Optional
     */
    [key: string]: any;
}

/**
 * Defines valid properties in TreeTable component.
 */
export interface TreeTableProps {
    /**
     * An array of treenodes.
     */
    value?: TreeNode[] | undefined;
    /**
     * A map of keys to represent the state of the tree expansion state in controlled mode.
     * @see TreeTableExpandedKeys
     */
    expandedKeys?: TreeTableExpandedKeys;
    /**
     * A map of keys to control the selection state.
     * @see TreeTableSelectionKeys
     */
    selectionKeys?: TreeTableSelectionKeys;
    /**
     * Defines the selection mode.
     */
    selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually.
     * On touch enabled devices, metaKeySelection is turned off automatically.
     * @defaultValue true
     */
    metaKeySelection?: boolean | undefined;
    /**
     * Number of rows to display per page.
     */
    rows?: number | undefined;
    /**
     * Index of the first row to be displayed.
     * @defaultValue 0
     */
    first?: number | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     */
    totalRecords?: number | undefined;
    /**
     * When specified as true, enables the pagination.
     * @defaultValue false
     */
    paginator?: boolean | undefined;
    /**
     * Position of the paginator, options are 'top','bottom' or 'both'.
     * @defaultValue bottom
     */
    paginatorPosition?: 'top' | 'bottom' | 'both' | undefined;
    /**
     * Whether to show it even there is only one page.
     * @defaultValue true
     */
    alwaysShowPaginator?: boolean | undefined;
    /**
     * Template of the paginator. It can be customized using the template property using the predefined keys. Here are the available elements that can be placed inside a paginator in any order.
     *
     * - FirstPageLink
     * - PrevPageLink
     * - PageLinks
     * - NextPageLink
     * - LastPageLink
     * - RowsPerPageDropdown
     * - JumpToPageDropdown
     * - JumpToPageInput
     * - CurrentPageReport
     *
     * @defaultValue FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown
     */
    paginatorTemplate?: string | undefined;
    /**
     * Number of page links to display.
     * @defaultValue 5
     */
    pageLinkSize?: number | undefined;
    /**
     * Array of integer values to display inside rows per page dropdown.
     */
    rowsPerPageOptions?: number[] | undefined;
    /**
     * Template of the current page report element. It displays information about the pagination state.
     *
     * - {currentPage}
     * - {totalPages}
     * - {rows}
     * - {first}
     * - {last}
     * - {totalRecords}
     *
     * @defaultValue '({currentPage} of {totalPages})'
     */
    currentPageReportTemplate?: string | undefined;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @defaultValue false
     */
    lazy?: boolean | undefined;
    /**
     * Displays a loader to indicate data load is in progress.
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     * @defaultValue pi pi-spinner
     */
    loadingIcon?: string | undefined;
    /**
     * When enabled, background of the rows change on hover.
     * @defaultValue false
     */
    rowHover?: boolean | undefined;
    /**
     * Whether the cell widths scale according to their content or not.
     * @defaultValue false
     */
    autoLayout?: boolean | undefined;
    /**
     * Property name or a getter function of a row data used for sorting by default.
     */
    sortField?: string | ((item: any) => string) | undefined | undefined;
    /**
     * Order to sort the data by default.
     */
    sortOrder?: number | undefined;
    /**
     * Default sort order of an unsorted column.
     * @defaultValue 1
     */
    defaultSortOrder?: number | undefined;
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     */
    multiSortMeta?: TreeTableSortMeta[] | undefined | null;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @defaultValue single
     */
    sortMode?: 'single' | 'multiple' | undefined;
    /**
     * When enabled, columns can have an un-sorted state.
     * @defaultValue false
     */
    removableSort?: boolean | undefined;
    /**
     * Filters object with key-value pairs to define the filters.
     * @see TreeTableFilterMeta
     */
    filters?: TreeTableFilterMeta;
    /**
     * Mode for filtering.
     * @defaultValue lenient
     */
    filterMode?: 'lenient' | 'strict' | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     */
    filterLocale?: string | undefined;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @defaultValue false
     */
    resizableColumns?: boolean | undefined;
    /**
     * Defines whether the overall table width should change on column resize.
     * @defaultValue fit
     */
    columnResizeMode?: 'fit' | 'expand' | undefined;
    /**
     * Indentation factor as rem value for children nodes.
     * @defaultValue 1
     */
    indentation?: number | undefined;
    /**
     * Whether to show grid lines between cells.
     * @defaultValue false
     */
    showGridlines?: boolean | undefined;
    /**
     * When specified, enables horizontal and/or vertical scrolling.
     * @defaultValue false
     */
    scrollable?: boolean | undefined;
    /**
     * Height of the scroll viewport in fixed pixels or the 'flex' keyword for a dynamic size.
     */
    scrollHeight?: 'flex' | string | undefined;
    /**
     * Orientation of the scrolling.
     * @defaultValue vertical
     */
    scrollDirection?: 'vertical' | 'horizontal' | 'both' | undefined;
    /**
     * Defines the responsive mode, currently only option is scroll.
     * @defaultValue stack
     */
    responsiveLayout?: 'stack' | 'scroll' | undefined;
    /**
     * Props to pass to the table element.
     */
    tableProps?: any | undefined;
}

/**
 * Defines valid slots in TreeTable component.
 */
export interface TreeTableSlots {
    /**
     * Custom header template.
     */
    header(): VNode[];
    /**
     * Custom footer template.
     */
    footer(): VNode[];
    /**
     * Custom paginator start template.
     */
    paginatorstart(): VNode[];
    /**
     * Custom paginator end template.
     */
    paginatorend(): VNode[];
    /**
     * Custom empty template.
     */
    empty(): VNode[];
}

/**
 * Defines valid emits in TreeTable component.
 */
export interface TreeTableEmits {
    /**
     * Emitted when the expanded keys change.
     * @param {TreeNode} value - New expanded keys.
     */
    'update:expandedKeys'(value: TreeTableExpandedKeys): void;
    /**
     * Emitted when the selection keys change.
     * @param {TreeSelectionKeys} value - New selection keys.
     */
    'update:selectionKeys'(event: TreeTableSelectionKeys): void;
    /**
     * Emitted when the first changes.
     * @param {number} value - New value.
     */
    'update:first'(value: number): void;
    /**
     * Emitted when the rows changes.
     * @param {number} value - New value.
     */
    'update:rows'(value: number): void;
    /**
     * Emitted when the sortField changes.
     * @param {string} value - New value.
     */
    'update:sortField'(value: string): void;
    /**
     * Emitted when the sortOrder changes.
     * @param {number | undefined} value - New value.
     */
    'update:sortOrder'(value: number | undefined): void;
    /**
     * Emitted when the multiSortMeta changes.
     * @param {TreeTableSortMeta[] | undefined | null} value - New value.
     */
    'update:multiSortMeta'(value: TreeTableSortMeta[] | undefined | null): void;
    /**
     * Callback to invoke on pagination. Sort and Filter information is also available for lazy loading implementation.
     * @param {TreeTablePageEvent} event - Custom page event.
     */
    page(event: TreeTablePageEvent): void;
    /**
     * Callback to invoke on sort. Page and Filter information is also available for lazy loading implementation.
     * @param {TreeTableSortEvent} event - Custom sort event.
     */
    sort(event: TreeTableSortEvent): void;
    /**
     * Event to emit after filtering, not triggered in lazy mode.
     * @param {TreeTableFilterEvent} event - Custom filter event.
     */
    filter(event: TreeTableFilterEvent): void;
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNode} node - Node instance.
     */
    'node-select'(node: TreeNode): void;
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNode} node - Node instance.
     */
    'node-unselect'(node: TreeNode): void;
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeNode} node - Node instance.
     */
    'node-expand'(node: TreeNode): void;
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeNode} node - Node instance.
     */
    'node-collapse'(node: TreeNode): void;
    /**
     * Callback to invoke when a column is resized.
     * @param {Event} event - Browser event.
     */
    'column-resize-end'(event: Event): void;
}

/**
 * **PrimeVue - TreeTable**
 *
 * _TreeTable is used to display hierarchical data in tabular format._
 *
 * [Live Demo](https://www.primevue.org/treetable/)
 * --- ---
 * ![PrimeVue](https://primefaces.org/cdn/primevue/images/logo-100.png)
 *
 * @group Component
 */
declare class TreeTable extends ClassComponent<TreeTableProps, TreeTableSlots, TreeTableEmits> {}

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        TreeTable: GlobalComponentConstructor<TreeTable>;
    }
}

export default TreeTable;
