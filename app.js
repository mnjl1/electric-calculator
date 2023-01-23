class PowerBank {
    constructor(amperHours, volt, watt) {
        this.amperHours = amperHours;
        this.volt = volt;
        this.watt = watt;
    };

    calculateWorkingHours() {
        const hours = parseFloat(this.amperHours * this.volt * 0.85) / this.watt;
        return hours;
    };

};

class UI {
    addItemToTable(item, time) {
        const itemList = document.getElementById('item-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.amperHours}</td>
            <td>${item.volt}</td>
            <td>${item.watt}</td>
            <td>${`${time[0]}год ${time[1]}мін`}</td>
        `;

        itemList.append(row);
    }

    setMessage(msg) {
        const message = document.querySelector('.message');
        message.textContent = msg;
    };

    clearError() {
        document.querySelector('.alert').remove();
    }

}


//Event listener for calculate and add to list
document.getElementById('form').addEventListener('submit', function(e) {
    calculateTime();

    e.preventDefault()
});

function calculateTime() {
    const amperHours = document.getElementById('amper-hours');
    const volt = document.getElementById('volt');
    const watt = document.getElementById('watt-hours');

    const ui = new UI();

    if (amperHours.value === ""  || watt.value === '') {
        showError('Потрібно внести корекні дані.');

        
    } else {
        const powerBank = new PowerBank(parseInt(amperHours.value), parseInt(volt.value), parseInt(watt.value))
        let hours = powerBank.calculateWorkingHours();
        console.log(hours)
        let time = parseTime(hours);
        ui.setMessage(`Пристрій пропрацює приблизно ${time[0]}г ${time[1]}хв.`);
        ui.addItemToTable(powerBank, time);
        amperHours.value = '';
        watt.value = '';
    }
};


function showError(errorMsg) {
    const ui = new UI();
    const errorDiv = document.createElement('div');
    const h = document.createElement('h5');
    const container = document.querySelector('.container');
    const heading = document.querySelector('#heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(h).appendChild(document.createTextNode(errorMsg));
    container.insertBefore(errorDiv, heading)

    setTimeout(ui.clearError, 3000);

}

function parseTime(h_t) {
    h = h_t.toString();
    time_array = h.split('.');
    h = time_array[0];
    m = Math.floor(60 * parseFloat('0' + '.' + time_array[1]));

    return [h, m];
};
