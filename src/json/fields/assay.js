var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRASY####',
    type: 'text',
    required: true
}, {
    name: 'category',
    text: 'Category',
    placeholder: '',
    values: [ 'DNA methylation', 'Histone modification', 'Open chromatin', 'Gene expression' ],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'technique',
    text: 'Technique',
    placeholder: 'Include OBI ID',
    required: true,
    type: 'text',
    values: [ 'ATAC-seq (transposase-accessible chromatin, OBI:0002039)', 'RNA-seq (OBI:0001271)', 'RRBS (reduced representation bisulfite sequencing, OBI:0001862)', 'ChIP-seq (histone modification, OBI:0002017)', 'WGBS (shotgun bisulfite-seq assay, OBI:0001863)' ],
    values_restricted: true
}, {
    name: 'assay_target',
    text: 'Target',
    placeholder: 'ChIP-seq only. Include SO ID',
    required: false,
    type: 'text',
    values: [ 'H3K4me1 (SO:0001705)', 'H3K4me3 (SO:0001706)', 'H3K27me3 (SO:0001709)', 'H3K27ac (SO:0002049)', 'H3K9me3 (SO:0001707)', 'Input' ],
    values_restricted: true
}, {
    name: 'population',
    text: 'Population',
    placeholder: 'RNA-seq only. Nucleic acid population, including enriched or depleted populations. Include OBI ID',
    values: [ 'rRNA-depleted total RNA', 'polyA mRNA (OBI:0000869)', 'total RNA (OBI:0000895)'],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'subcellular_fraction',
    text: 'Subcellular fraction',
    placeholder: 'Include GO term for subcellular fraction isolated from cell.',
    type: 'text',
    required: false,
    values: [ 'Whole cell', 'Nuclei' ],
    values_restricted: true
}, {
    name: 'strand_specificity',
    text: 'Strand specificity',
    placeholder: '',
    values: [ 'forward', 'reverse', 'none' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'assay_protocol',
    text: 'Assay protocol',
    placeholder: 'Upload assay protocol and specify URL.',
    type: 'text',
    required: true,
    pilot: true
}, {
    name: 'starting_cells',
    text: 'Starting amount of cells/nuclei (mg)',
    placeholder: 'Amount of cells input into assay (if applicable)',
    type: 'float',
    required: false,
    pilot: true
}, {
    name: 'tissue_weight',
    text: 'Tissue weight (mg)',
    placeholder: 'Amount of tissue input into assay (if applicable)',
    type: 'float',
    required: false,
    pilot: true
}, {
    name: 'starting_cell_count',
    text: 'Starting number of cells (k)',
    placeholder: 'Number of cells input into assay (if applicable)',
    type: 'float',
    required: false,
    pilot: true
}, {
    name: 'starting_nucleic_acid',
    text: 'Starting amount of nucleic acid (ng)',
    placeholder: 'Amount of nucleic acid input into assay (if applicable)',
    type: 'float',
    required: false,
    pilot: true
}, {
    name: 'date_extracted',
    text: 'Date extracted',
    placeholder: 'Date nucleic acid was extracted. Format as YYYY-MM-DD.',
    type: 'date',
    required: false
}, {
    name: 'date_performed',
    text: 'Date prepared',
    placeholder: 'Date library was prepared. Format as YYYY-MM-DD.',
    type: 'date',
    required: true
}, {
    name: 'processed_by',
    text: 'Processed by',
    placeholder: 'Initials of individual or name of group preparing the library.',
    type: 'text',
    required: true
}, {
    name: 'detergent_added',
    text: 'Detergent added (ATAC-seq)',
    placeholder: '',
    values: [ 'NA','TRUE', 'FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'filtering_method',
    text: 'Filtering method (ATAC-seq)',
    placeholder: '',
    values: [ 'Miracloth', 'Celltrics column', 'None' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
