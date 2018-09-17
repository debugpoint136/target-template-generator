var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRFF####',
    type: 'text',
    required: true
  }, {
    name: 'filename',
    text: 'Name',
    placeholder: '',
    type: 'text',
    required: true,
    pilot: true
  }, {
    name: 'format',
    text: 'Format',
    placeholder: '',
    values: [ 'fastq' ],
    type: 'text',
    required: true,
    values_restricted: false
  }, {
    name: 'md5sum',
    text: 'md5sum',
    placeholder: 'md5sum should be an actual value (used to track/validate uploaded file)',
    type: 'text',
    required: true
  }, {
    name: 'size',
    text: 'Size (bytes)',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'description',
    text: 'Description',
    placeholder: '',
    values: [ 'raw reads' ],
    type: 'text',
    required: true,
    values_restricted: false
  }, {
    name: 'run_type',
    text: 'Run type',
    placeholder: '',
    values: [ 'single-end', 'paired-end' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'read_length',
    text: 'Read length (nt)',
    placeholder: '',
    type: 'textnumber',
    required: true
  }, {
    name: 'pair',
    text: 'Pair',
    placeholder: '',
    values: [ 'forward', 'reverse' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'library_prep_protocol',
    text: 'Library preparation protocol',
    placeholder: 'Upload library prep protocol and specify URL',
    type: 'text',
    required: true
  }, {
    name: 'platform',
    text: 'Platform',
    placeholder: '',
    values: [ 'Illumina', 'Solexa' ],
    type: 'text',
    required: true,
    values_restricted: false
  }, {
    name: 'instrument',
    text: 'Instrument',
    placeholder: 'Model (e.g., HiSeq)',
    values: [ 'HiSeq', 'MiSeq' ],
    type: 'text',
    required: true,
    values_restricted: false
  }, {
    name: 'machine',
    text: 'Machine',
    placeholder: 'Individual machine used for sequencing (for batch effects)',
    type: 'text',
    required: true
  }, {
    name: 'chemistry',
    text: 'Chemistry',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'pcr_cycles',
    text: 'PCR cycles',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'insert_size',
    text: 'Library insert size (nt)',
    placeholder: 'Average size of sequencing library insert',
    type: 'textnumber',
    required: true
  }, {
    name: 'standard_deviation',
    text: 'Standard deviation (nt)',
    placeholder: 'Standard deviation of sequencing library insert size (optional)',
    type: 'textnumber',
    required: false
  }, {
    name: 'index',
    text: 'Sequencing index',
    placeholder: 'Index used for demultiplexing',
    type: 'text',
    required: false
  }, {
    name: 'barcode',
    text: 'Barcode',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'sequencing_lane',
    text: 'Sequencing lane',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'run_number',
    text: 'Run number',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'spike_ins',
    text: 'Spike-ins present',
    placeholder: '',
    values: ['NA', 'TRUE','FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'sequencing_kit',
    text: 'Sequencing kit',
    placeholder: 'Sequencing library preparation kit',
    type: 'text',
    required: false
  }, {
    name: 'sequencing_protocol',
    text: 'Sequencing protocol',
    placeholder: 'Upload sequencing protocol and specify URL',
    type: 'text',
    required: true
  }, {
    name: 'submitted_by',
    text: 'Submitted by',
    placeholder: 'Individual who submitted library',
    type: 'text',
    required: true
  }, {
    name: 'sequenced_by',
    text: 'Sequenced by',
    placeholder: 'Lab who performed sequencing',
    type: 'text',
    required: true
  }, {
    name: 'comments',
    text: 'Comments',
    placeholder: 'Add any other details',
    type: 'textarea',
    required: false,
    pilot: true
  }, {
    name: 'date_generated',
    text: 'Date generated',
    placeholder: 'Date sequencing library was generated',
    type: 'date',
    required: true
  }, {
    name: 'date_sequenced',
    text: 'Date sequenced',
    placeholder: '',
    type: 'date',
    required: true
  }, {
    name: 'pilot',
    text: 'Data Phase',
    placeholder: 'Is the data test, pilot, or production data?',
    values: [ 'test', 'pilot', 'production' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'submission_id',
    text: 'Submission ID',
    placeholder: 'Please see your data submission dashboard for this information',
    type: 'text',
    required: true
  }, {
    name: 'file_uuid',
    text: 'File UUID',
    placeholder: 'Please see your data submission dashboard for this information',
    type: 'text',
    required: true
}];

module.exports = fields;
