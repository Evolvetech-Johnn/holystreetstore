import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import componentStyles from '../styles/components.module.css';

const SizeGuide = ({ isOpen, onClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-dark-secondary text-left shadow-holy transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-gray-800">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-white focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-2xl font-black uppercase italic text-white mb-6 text-center">
                    Guia de <span className={componentStyles.gradientText}>Medidas</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80" 
                            className="w-full h-auto rounded-xl opacity-80" 
                            alt="Guia de Medidas"
                        />
                         <p className="mt-4 text-xs text-gray-500 text-center">
                            * As medidas são aproximadas e podem variar até 2cm.
                         </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="font-black text-white uppercase text-sm mb-4 border-l-4 border-primary-pink pl-3">Camisetas (Oversized)</h4>
                             <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-gray-400">
                                    <thead className="text-[10px] text-gray-500 uppercase bg-dark-tertiary">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Tamanho</th>
                                            <th className="px-4 py-3">Largura</th>
                                            <th className="px-4 py-3 rounded-r-lg">Comprimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">P</td>
                                            <td className="px-4 py-3">54 cm</td>
                                            <td className="px-4 py-3">72 cm</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">M</td>
                                            <td className="px-4 py-3">56 cm</td>
                                            <td className="px-4 py-3">74 cm</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">G</td>
                                            <td className="px-4 py-3">58 cm</td>
                                            <td className="px-4 py-3">76 cm</td>
                                        </tr>
                                        <tr className="">
                                            <td className="px-4 py-3 font-bold text-white">GG</td>
                                            <td className="px-4 py-3">60 cm</td>
                                            <td className="px-4 py-3">78 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black text-white uppercase text-sm mb-4 border-l-4 border-primary-green pl-3">Moletons</h4>
                             <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-gray-400">
                                    <thead className="text-[10px] text-gray-500 uppercase bg-dark-tertiary">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Tamanho</th>
                                            <th className="px-4 py-3">Largura</th>
                                            <th className="px-4 py-3 rounded-r-lg">Comprimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">P</td>
                                            <td className="px-4 py-3">58 cm</td>
                                            <td className="px-4 py-3">70 cm</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">M</td>
                                            <td className="px-4 py-3">60 cm</td>
                                            <td className="px-4 py-3">72 cm</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="px-4 py-3 font-bold text-white">G</td>
                                            <td className="px-4 py-3">62 cm</td>
                                            <td className="px-4 py-3">74 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SizeGuide;
