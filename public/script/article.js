const deletePost = (id) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Êtes-vous sûr?',
        text: "Une fois supprimé, vous ne pouvez pas le récuperer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:3001/delete/${id}`,
                method: "DELETE",

                success: function (data) {
                    console.log(data);
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                },
                error: function (err) {
                    console.error(err);
                },
            });


        } 
    })


};
