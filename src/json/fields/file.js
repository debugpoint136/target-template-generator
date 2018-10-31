var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRFF####',
    type: 'text',
    required: true
  }, {
    name: 'submission_id',
    text: 'Submission ID',
    placeholder: 'Please see your data submission dashboard for this information',
    type: 'text',
    required: true
  }, {
    name: 'pilot',
    text: 'Data Phase',
    placeholder: '',
    values: [ 'test', 'pilot', 'production' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'file_uuid',
    text: 'File UUID',
    placeholder: 'Please see your data submission dashboard for this information',
    type: 'text',
    required: true
  }, {
    name: 'filename',
    text: 'Name',
    placeholder: 'Example: "V115.PE1.fastq.gz"',
    type: 'text',
    required: true,
    pilot: true
  }, {
    name: 'md5sum',
    text: 'md5sum',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'format',
    text: 'Format',
    placeholder: '',
    values: [ 'fastq' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'description',
    text: 'Description',
    placeholder: '',
    values: [ 'raw reads' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'run_type',
    text: 'Run type',
    placeholder: '',
    values: [ 'single-end', 'paired-end' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'pair',
    text: 'Pair',
    placeholder: '',
    values: [ 'forward', 'reverse' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'read_length',
    text: 'Read length (nt)',
    placeholder: '',
    type: 'integer',
    required: true
  }, {
    name: 'platform',
    text: 'Platform',
    placeholder: '',
    values: [ 'Illumina' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'instrument',
    text: 'Instrument',
    placeholder: '',
    values: [ 'HiSeq 2500', 'HiSeq 3000','HiSeq 4000', 'HiSeq X10', 'NextSeq 500', 'Novaseq 6000' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'machine',
    text: 'Machine',
    placeholder: 'Barcode for individual machine used for sequencing (for batch effects) (see fastq sequence ID - @<instrument>:<run number>)',
    type: 'text',
    required: true
  }, {
    name: 'run_number',
    text: 'Run number',
    placeholder: '(see fastq sequence ID - @<instrument>:<run number>)',
    type: 'text',
    required: true
  }, {
    name: 'sequencing_lane',
    text: 'Sequencing lane',
    placeholder: '',
    type: 'integer',
    required: true
  }, {
    name: 'spike_ins',
    text: 'Spike-ins present',
    placeholder: '',
    values: [ 'TRUE','FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true
  }, {
    name: 'pcr_cycles',
    text: 'PCR cycles',
    placeholder: '',
    type: 'integer',
    required: true
  }, {
    name: 'insert_size',
    text: 'Library insert size (nt)',
    placeholder: 'Average size of sequencing library insert. Determined by size selection at library creation step.',
    type: 'text',
    required: true
  }, {
    name: 'standard_deviation',
    text: 'Standard deviation (nt)',
    placeholder: 'Standard deviation of sequencing library insert size. Refers to Library insert size.',
    type: 'float',
    required: false
  }, {
    name: 'barcode',
    text: 'Barcode',
    placeholder: '',
    type: 'text',
    required: true
  }, {
    name: 'sequenced_by',
    text: 'Sequenced by',
    placeholder: 'Lab who performed sequencing.',
    type: 'text',
    required: true
  }, {
    name: 'date_sequenced',
    text: 'Date sequenced',
    placeholder: '',
    type: 'date',
    required: true
  }, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false,
    pilot: true
}];

module.exports = fields;
