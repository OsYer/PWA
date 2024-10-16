import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Eliminar = () => {
  return (
    <div class="modal fade" id="basicModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title text-white">Eliminar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form asp-controller="AdmUsuarios" asp-action="BorrarAdmUsuario">
              <div asp-validation-summary="ModelOnly" class="text-danger"></div>
              <div class="mb-3">
                <p>¿Estás seguro de eliminar este usuario?</p>
                <p>Nombre del usuario: @Model.Nombre</p>
                <p>Correo: @Model.Correo</p>
                <input type="hidden" asp-for="IdUsuario" class="form-control" />
                <span asp-validation-for="IdUsuario" class="text-danger"></span>
              </div>

              <div class="modal-footer pb-1">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Eliminar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eliminar;
