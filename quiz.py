from cryptography import fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABcu-0nm647c_Q3K-7RCCwBozsnOIrBCP7tenOV9gOSFK5N9LOCiNHDHKfsqRCoVcRKF_6ZvVIAKovSEwoKxFhh08QR0w_gKL7vGRaHwLKkBUW_aIorYv11K4l8SNaC_8rWuUSicEBEh6vDVfBcRkB54QawI2S7-k_ip3yLR2u8FMqg-1g='

def main():
    f = fernet.Fernet(key)
    print(f.decrypt(message))


if __name__ == "__main__":
    main()