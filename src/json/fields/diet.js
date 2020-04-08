var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRDIET####',
    type: 'text',
    required: true
}, {
    name: 'category',
    text: 'Category',
    placeholder: '',
    required: true,
    type: 'text',
    values: ['Standard', 'Dietary Challenge'],
    values_restricted: true
}, {
    name: 'description',
    text: 'Description',
    placeholder: 'Base diet. Dietary treatments will be included in the treatment tab.',
    type: 'text',
    required: true,
    values: ['Soy Protein Free-Teklad/Envigo-2020X', '7% Corn Oil-Phytoestrogen Free-Teklad/Envigo-TD.95092', 'Standard Chow-Research Diets Inc-AIN-93G', 'Normal Diet-Prolab-P3000', 'High-Fat Diet-OpenSource-D12492'],
    values_restricted: true
}, {
    name: 'batchId',
    text: 'Batch number',
    placeholder: 'Include all batches for the given diet. Contact the DCC to add an additional batch if you encounter permission issues.',
    type: 'text',
    required: false
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
