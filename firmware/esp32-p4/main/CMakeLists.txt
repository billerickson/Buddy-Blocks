idf_component_register(
  SRCS "app_main.cpp"
  INCLUDE_DIRS "."
  REQUIRES
    buddy_board
    buddy_content
    buddy_connectivity
    buddy_ota
    buddy_storage
    buddy_sync
    buddy_ui
    mbedtls
    nvs_flash
)

target_compile_features(${COMPONENT_LIB} PRIVATE cxx_std_17)
target_compile_options(${COMPONENT_LIB} PRIVATE -std=gnu++17 -fno-exceptions -fno-rtti -Wall -Wextra -Werror)
