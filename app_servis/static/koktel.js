window.addEventListener("load", function (){
    document.getElementById("forma").addEventListener("submit", function (){
        var validno = true;

        if (document.getElementById("naziv").value.length < 3){
            validno = false;
            document.getElementById("naziv").classList.add("error");
            document.getElementById("naziv").classList.remove("success");
        }else{
            document.getElementById("naziv").classList.add("success");
            document.getElementById("naziv").classList.add("error")
        }
        return validno;
    })

    document.getElementById("naziv").addEventListener("keypress", function(){
        this.classList.remove('success');
        this.classList.remove('error');
    });

    document.getElementById("dodaj-sastojak").addEventListener("click", function(){
        var id = document.getElementById("spisak-sastojaka").value;

        var spanovi = document.querySelectorAll("#sastojci > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
        }
        var sastojciJSON = JSON.stringify(niz);
        var sastojciInput = document.getElementById("sastojci-input");
        sastojciInput.value = sastojciJSON;

        if(!id){
            alert("Izaberi sastojak");
            return;
        }
        dodajSastojak(id);
    });


})