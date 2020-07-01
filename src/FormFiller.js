class FormFiller
{
    static init()
    {
        this.validElementTypes = [
            'INPUT',
            'SELECT',
            'TEXTAREA',
        ];

        this.validInputTypes = [
            'button',
            'checkbox',
            'color',
            'date',
            'email',
            'number',
            'radio',
            'range',
            'text',
        ];

        this.form = document.activeElement.closest('form');
        this.fields = this.form.querySelectorAll(this.validElementTypes.join(', '));

        this.processTextFields();
        this.processRadioFields();
        this.processCheckboxFields();
        this.processSelectFields();
        this.fields.forEach(field => this.handleField(field));
    }

    static handleField(field)
    {
        // Get the tag name
        let tagName = field.tagName;

        // Break if tag name is not one of the valid types
        if (!this.validElementTypes.includes(tagName)) return false;
    }

    static processTextFields()
    {
        // Get all text fields
        let textFields = this.getFieldsByType('text');

        textFields.forEach(field => field.value = `Testing Field - ${field.name}`);
    }

    static processSelectFields()
    {
        // Get all select fields
        let selectFields = [...this.fields].filter(field => field.tagName == 'SELECT');

        selectFields.forEach(field => {
            const options = field.children;

            const random = Math.floor(Math.random() * options.length);
            
            field.value = options[random].value;
        });
    }

    static processRadioFields()
    {
        // Get all radio inputs
        let radioFields = this.getFieldsByType('radio');

        // Group the radio inputs by their name
        let radioGroups = this.groupByProperty(radioFields, 'name');

        // Loop through each radio group and select a random option
        for (const group in radioGroups) {
            let randomOption = radioGroups[group][Math.floor(Math.random() * radioGroups[group].length)];
            randomOption.checked = true;
        }
    }

    static processCheckboxFields()
    {
        // Get all checkbox inputs
        let checkboxFields = this.getFieldsByType('checkbox');

        // Group the checkbox inputs by their name
        let checkboxGroups = this.groupByProperty(checkboxFields, 'name');

        // Loop through each checkbox group and select a random option
        for (const group in checkboxGroups) {
            let randomOption = checkboxGroups[group][Math.floor(Math.random() * checkboxGroups[group].length)];
            randomOption.checked = true;
        }
    }

    /**
     * 
     * @param {string} type 
     */
    static getFieldsByType(type)
    {
        return [...this.fields].filter(field => field.type == type);
    }

    /**
     * 
     * @param {array} arr 
     * @param {string} prop 
     */
    static groupByProperty(arr, prop)
    {
        return arr.reduce((acc, cur) => {
            acc[cur[prop]] = [...acc[cur[prop]] || [], cur];
            return acc;
        }, {});
    }
}